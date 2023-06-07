import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs';

interface UserDetails {
  CanWrite: boolean;
  extjsUrl: string;
  UserStat: boolean;
  username: string;
  company: string;
  company_name: string;
}

interface FactoryDetails {
  Code: string;
  Name: string;
}

interface wcTypes {
  TpCode: string;
  TpName: string;
}

interface workCenters {
  Code: string;
  Desc: string;
  DescLocal: string;
  Name: string;
  TpCode: string;
  checkSOP: boolean;
  includeOffOpr: boolean;
  isBatch: boolean;
  nonWorkingDays: number[];
  numOfOprBfr: number;
}

interface WorkCenterList {
  type: wcTypes[];
  wc: workCenters[];
}

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

  public getFactories(): Observable<FactoryDetails[]> {
    const url: string = 'https://someDomain.com/iscar'; // ["company 1", "company 2"]
    const factoryDetails: FactoryDetails[] = [
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
}
