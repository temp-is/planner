import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs';
import {
  Factory,
  IMachine,
  UserDetails,
  WorkCenter,
  WorkCenterList,
} from '../shared/models';
import { API } from '../core/API';

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

  public getFactories(): Observable<Factory[]> {
    const url: string = 'https://someDomain.com/iscar'; // ["company 1", "company 2"]
    const factoryDetails: Factory[] = [
      {
        Code: 'GA',
        Name: 'GA: General & Admin',
      },
      {
        Code: 'HA',
        Name: 'HA: Carbide A',
      },
      {
        Code: 'XX',
        Name: 'XX: Powder,for CMS',
      },
    ];

    return of(factoryDetails);
  }

  public getWorkCenter(): Observable<WorkCenterList> {
    const url: string = 'https://someDomain.com/iscar'; // ["company 1", "company 2"]
    const workCenterList: WorkCenterList = {
      type: [
        {
          TpCode: 'DR',
          TpName: 'DR : DRILLING',
        },
        {
          TpCode: 'CR',
          TpName: 'CR : TURNING',
        },
      ],
      wc: [
        {
          Code: '22',
          Desc: 'M1-TURN MANUAL',
          DescLocal: 'M1-TOURNAGE MAN',
          Name: '22 : M1-TURN MANUAL',
          TpCode: 'CR',
          checkSOP: false,
          includeOffOpr: false,
          isBatch: false,
          nonWorkingDays: [0, 6],
          numOfOprBfr: 25,
        },
      ],
    };

    return of(workCenterList);
  }

  public getMachine(): Observable<IMachine[]> {
    const url: string = 'https://someDomain.com/iscar';
    const machine: IMachine[] = [
      {
        Name: '03: TBT ML200-2-800',
        desc: 'TBT ML200-2-800',
        machId: '03',
      },
      {
        Name: '04: TBT ML200-2-800',
        desc: 'TBT ML200-2-800',
        machId: '04',
      },
      {
        Name: '05: TBT ML200-2-800',
        desc: 'TBT ML200-2-800',
        machId: '05',
      },
      {
        Name: '06: TBT ML200-2-800',
        desc: 'TBT ML200-2-800',
        machId: '06',
      },
    ];

    return of(machine);
  }

  public getUserDetails(): Observable<UserDetails> {
    //Need to understand how to get all of the data
    const url: string = 'https://someDomain.com/iscar';
    const userDetails: UserDetails = {
      CanWrite: true,
      extjsUrl: 'https://extjs-ltd.ssl.imc-grp.com',
      UserStat: true,
      username: 'ISYAH',
      company: 'XZ',
      company_name: 'TEST COMPANY',
    };
    return of(userDetails);
  }

  public createWorkcenterData(data: any): Observable<{ [key: string]: any }> {
    debugger;
    return forkJoin({
      resourceStore: this.http.get(API['getresourcestore']),
      availability: this.http.get(API['getavailability']),
      holidays: this.http.get(API['getHolidays']),
      unloadedorders: this.http.get(API['getunloadedorders']),
      loadedorders: this.http.get(API['getloadedorders']),
    });
  }

  public initAppRequests(): Observable<{ [key: string]: any }> {
    return forkJoin({
      userDetails: this.http.get(API['userDetails']),
      factorylist: this.http.get(API['factorylist'](1, 25)),
      appdefaults: this.http.get(API['appdefaults']),
    });
  }
}
