import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, forkJoin, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import {
  IAvailability,
  ICreateworkcenterdata,
  IHolidays,
  ILoadedOrders,
  IMachine,
  IResource,
  IUnloadedOrders,
  IWorkCenter,
} from '../shared/models';
import { API } from '../core/API';
import { IInitialData } from '../core/models/inital-data.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private initialAppDataSubject$: BehaviorSubject<IInitialData> =
    new BehaviorSubject(null);

  private UnloadedOrders$: Subject<IUnloadedOrders[]> = new Subject();
  private LoadedOrders$: Subject<ILoadedOrders[]> = new Subject();
  private Resurce$: Subject<IResource[]> = new Subject();
  private preloadMch: boolean = false;
  public progressBar: boolean = false;

  public getUnloadedOrders$(): Observable<IUnloadedOrders[]> {
    return this.UnloadedOrders$.asObservable();
  }

  public setUnloadedOrders$(data: IUnloadedOrders[]): void {
    this.UnloadedOrders$.next(data);
  }

  public getLoadedOrders$(): Observable<ILoadedOrders[]> {
    return this.LoadedOrders$.asObservable();
  }

  public setLoadedOrders$(data: ILoadedOrders[]): void {
    this.LoadedOrders$.next(data);
  }
  public getResurces$(): Observable<IResource[]> {
    return this.Resurce$.asObservable();
  }

  public setResurces$(data: IResource[]): void {
    this.Resurce$.next(data);
  }

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

  public updatecolumns(fieldArr: any, filterArr: any): Observable<string> {
    const params = new HttpParams()
      .append('fieldArr', JSON.stringify(fieldArr))
      .append('filterArr', JSON.stringify(filterArr));
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };

    return this.http.get<'sd'>(API['updatecolumns'], httpOptions);
  }

  public changeusercompany(
    company: string,
    workcentercode: string,
    unlock: boolean,
    clearMFP: boolean
  ): Observable<string> {
    const params = new HttpParams()
      .append('company', company)
      .append('workcentercode', workcentercode)
      .append('unlock', JSON.stringify(unlock))
      .append('clearMFP', JSON.stringify(clearMFP));
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };

    return this.http.get<'sd'>(API['changeusercompany'], httpOptions);
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

  public getloadedorders(data: any): Observable<ILoadedOrders[]> {
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
    return this.http.get<ILoadedOrders[]>(API['loadedOrders'], httpOptions);
  }

  public getloadedordersTest(): Observable<ILoadedOrders[]> {
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
    return this.http.get<ILoadedOrders[]>(API['loadedOrders'], httpOptions);
  }

  public createworkcenterdata(data: any): Observable<ICreateworkcenterdata> {
    const params = new HttpParams()
      .append('workcentercode', data.workCenter)
      .append('factoryCode', data.factory)
      .append('machines', data.machine)
      .append('includeOffOpr', data.includeOfficeCheckBox)
      .append('numOfOprBfr', 5)
      .append('viewMode', data.viewModeCheckBox)
      .append('lockWC', true);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<ICreateworkcenterdata>(
      API['createworkcenterdata'],
      httpOptions
    );
  }

  public getavailability(data: any): Observable<IAvailability[]> {
    const params = new HttpParams()
      .append('workCenterCode', data.workCenter)
      .append('machines', data.machine)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 500);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<IAvailability[]>(API['availability'], httpOptions);
  }

  public getresourcestore(data: any): Observable<IResource[]> {
    if (this.storage.getData('userDetails').defaultValues.PRELOAD != '') {
      this.preloadMch = true;
    }
    const params = new HttpParams()
      .append('workCenterCode', data.workCenter)
      .append('machines:', data.machine)
      .append('preloadMch', this.preloadMch)
      .append('localLang', true)
      .append('page', 1)
      .append('start', 0)
      .append('limit', 500)
      .append('isAngular', true);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<IResource[]>(API['resource'], httpOptions);
  }
  public getHolidays(data: any): Observable<IHolidays[]> {
    const params = new HttpParams().append('factoryCode', data.factory);
    const httpOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true,
      params: params,
    };
    return this.http.get<IHolidays[]>(API['getHolidays'], httpOptions);
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
