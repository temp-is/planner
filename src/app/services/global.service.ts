import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public getWorkCenter(factoryCode: string): Observable<IWorkCenter[]> {
    const params = new HttpParams()
      .append('factoryCode', factoryCode)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 25);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<IWorkCenter[]>(API['workcenterlist'], httpOptions);
  }

  public getMachine(workCenter: string): Observable<IMachine[]> {
    const params = new HttpParams()
      .append('workCenter', workCenter)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 25);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<IMachine[]>(API['machielist'], httpOptions);
  }
  public getunloadedorders(data: any): Observable<IUnloadedOrders[]> {
    const params = new HttpParams()
      .append('getWcn', data.workCenter)
      .append('localLang', true)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 500);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };

    return this.http.get<IUnloadedOrders[]>(API['unloadedOrders'], httpOptions);
  }

  public getunloadedorderstest(): Observable<IUnloadedOrders[]> {
    const params = new HttpParams()
      .append('getWcn', 'K4P')
      .append('localLang', true)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 500);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };

    return this.http.get<IUnloadedOrders[]>(API['unloadedOrders'], httpOptions);
  }

  public getInitalAppData(): Observable<IInitialData> {
    if (this.initialAppDataSubject$.value) {
      return this.initialAppDataSubject$.asObservable();
    }

    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
    };

    return forkJoin({
      userDetails: this.http.get(API['userDetails'], httpOptions),
      factorylist: this.http.get(API['factorylist'], httpOptions),
      appdefaults: this.http.get(API['appdefaults'], httpOptions),
    }).pipe(
      tap((data) => {
        this.storage.setData('userDetails', data['userDetails']);
        this.storage.setData('factorylist', data['factorylist']);
        this.initialAppDataSubject$.next(data);
      })
    );
  }
}
