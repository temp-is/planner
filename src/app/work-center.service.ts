import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkCenterService {

  private workCenterSeklected$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { }

  public isWorkCenterSelected$(): Observable<boolean> {



    return this.workCenterSeklected$.asObservable()
  }
}
