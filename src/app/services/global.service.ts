import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  public getCompanies(): Observable<string[]> {
    const url: string = 'https://someDomain.com/iscar'; // ["company 1", "company 2"]
    const mockData = ['company 1', 'company 2', 'company 3'];

    return of(mockData);

    return <Observable<string[]>>this.http.get(url).pipe(
      map((data) => {
        // return data;

        return ['company 1', 'company 2', 'company 3'];
      })
    );
  }
}
