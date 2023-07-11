import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse } from 'src/common/interfaces';
import { secrets, tmdb_configs } from 'src/common/utils';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private requestOptions;

  constructor(private http: HttpClient,) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${secrets.access_token}`
    });

    this.requestOptions = { headers };

  }

  getTrendingTitles(type = 'movie') {
    const url = `${tmdb_configs.base.api}trending/${type}/day?language=en-US`;
    return this.http.get<MovieResponse>(url, this.requestOptions)

  }

  searchTitle(query: string = '') {
    const url = `${tmdb_configs.base.api}search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    return this.http.get<any>(url, this.requestOptions)

  }
}
