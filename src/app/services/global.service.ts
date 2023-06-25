import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, forkJoin, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { IMachine, IUnloadedOrders, IWorkCenter } from '../shared/models';
import { API } from '../core/API';
import { IInitialData } from '../core/models/inital-data.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private initialAppDataSubject$: BehaviorSubject<IInitialData> =
    new BehaviorSubject(null);

  constructor(private http: HttpClient, private storage: StorageService) {}

  public getWorkCenter(): Observable<IWorkCenter[]> {
    return this.http.get<IWorkCenter[]>(API['workcenterlist']);
  }

  public getMachine(): Observable<IMachine[]> {
    return this.http.get<IMachine[]>(API['machielist']);
  }
  public getunloadedorders(): Observable<IUnloadedOrders[]> {
    return this.http.get<IUnloadedOrders[]>(API['unloadedOrders']);
  }

  public createWorkcenterData(data: any): Observable<{ [key: string]: any }> {
    return forkJoin({
      //resourceStore: this.http.get(API['getresourcestore']),
      // availability: this.http.get(API['getavailability']),
      // holidays: this.http.get(API['getHolidays']),
      // unloadedorders: this.http.get(API['getunloadedorders']),
      // loadedorders: this.http.get(API['getloadedorders']),
    });
  }

  public getInitalAppData(): Observable<IInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
    };

    if (this.initialAppDataSubject$.value)
      return this.initialAppDataSubject$.asObservable();

    return forkJoin({
      userDetails: this.http.get(API['userDetails'], httpOptions),
      factorylist: this.http.get(API['factorylist'], httpOptions),
      // appdefaults: this.http.get(API['appdefaults']),
    }).pipe(
      tap((data) => {
        this.storage.setData('userDetails', data['userDetails']);
        this.storage.setData('factorylist', data['factorylist']);
        this.initialAppDataSubject$.next(data);
      })
    );
  }
}
