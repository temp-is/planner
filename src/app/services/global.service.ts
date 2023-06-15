import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs';
import { IMachine, IUnloadedOrders, IWorkCenter } from '../shared/models';
import { API } from '../core/API';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private http: HttpClient) {}

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

  public initAppRequests(): Observable<{ [key: string]: any }> {
    return forkJoin({
      userDetails: this.http.get(API['userDetails']),
      factorylist: this.http.get(API['factorylist']),
      // appdefaults: this.http.get(API['appdefaults']),
    });
  }
}
