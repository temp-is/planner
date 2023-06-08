import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs';
import {
  Factory,
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

  public initAppRequests(): Observable<{ [key: string]: any }> {
    // const url1 = "https://planner-ltd.ssl.imc-grp.com:10443/index/getuserdetails"
    return forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        userDetails: this.http.get(API['userDetails']),
      }
    );
  }
}
