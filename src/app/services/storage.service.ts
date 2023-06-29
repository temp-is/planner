import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  clear() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  public setData(key: string, value: any): void {
    const stringifiedData = JSON.stringify(value);
    localStorage.setItem(key, stringifiedData);
  }
  public getData(key: string): any {
    const rawData = localStorage.getItem(key);
    if (rawData) {
      const data = JSON.parse(rawData);
      return data;
    }
  }
  public deletedData(key: string): void {
    localStorage.removeItem(key);
  }
}
