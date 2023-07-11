import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheMap = new Map();

  constructor() {

  }

  getCachedData(cacheKey: string) {
    return this.cacheMap.get(cacheKey);
  }

  setCacheData(cacheKey: string, value: any) {
    this.cacheMap.set(cacheKey, value);
  }
}
