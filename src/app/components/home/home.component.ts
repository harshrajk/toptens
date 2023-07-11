import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CacheService } from 'src/app/cache.service';
import { MovieResponse } from 'src/common/interfaces';
import { tmdb_configs } from 'src/common/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {

  public trendingData: MovieResponse = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  };
  public type: string = 'movie';
  public loading: boolean = true;
  public closeInitScreen: boolean = true;
  public imgBase = tmdb_configs?.images.secure_base_url;
  public posterSize: any = tmdb_configs?.images?.poster_sizes;
  public searchModalOpen: boolean = false;
  public searchResults: Array<any> = [];
  public searchInput = '';
  public filter = 'movie'

  debounceTime = 500;

  constructor(private appService: AppService, private cacheService: CacheService) {
    this.checkInitScreen();
  }

  checkInitScreen() {
    const init_closed = localStorage.getItem('greet_closed');
    if (!init_closed) {
      this.closeInitScreen = false;
    }
  }

  ngOnInit(): void {
    this.getTrendingData()
  }

  closeInit() {
    this.closeInitScreen = true;
    localStorage.setItem('greet_closed', 'true');
  }

  getTrendingData() {
    const key = 'movies';
    if (this.cacheService.getCachedData(key)) {
      this.loading = false;
      this.trendingData = this.cacheService.getCachedData(key)
    } else {
      this.appService.getTrendingTitles()
        .subscribe((data): void => {
          if (data && data?.results) {
            this.loading = false;
            this.trendingData = data;
            this.cacheService.setCacheData(key, data);
          }
        })
    }
  }

  openSearchBox(type = 'open') {
    this.searchModalOpen = type === 'open' ? true : false;
    if (type === 'close') {
      this.searchResults = [];
      this.searchInput = '';
    }
  }

  changeType() {

  }

  searchTitle(ev: Event) {
    let value = (ev.target as HTMLInputElement).value
    if (value) {
      this.appService.searchTitle(value)
        .subscribe(results => {
          if (results && results?.results.length) {
            this.searchResults = [...results?.results];
          } else {
            this.searchResults = [];
          }
        })
    }
  }
  filterChange(type: string) {
    this.filter = type;
    this.loading = true;
    const key = type === 'movie' ? 'movies' : 'tvshows';
    if (this.cacheService.getCachedData(key)) {
      this.loading = false;
      this.trendingData = this.cacheService.getCachedData(key)
    } else {
      this.appService.getTrendingTitles(type)
        .subscribe((data): void => {
          if (data && data?.results) {
            this.loading = false;
            this.trendingData = data;
            this.cacheService.setCacheData(key, data);
          }
        })
    }
  }
}
