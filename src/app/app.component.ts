import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkCenterService } from './work-center.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'planner';
  public isWorkCenterSelected$: Observable<boolean>;;

  constructor(private workCenterService: WorkCenterService) {

  }


  ngOnInit() {
    this.isWorkCenterSelected$ = this.workCenterService.isWorkCenterSelected$()
  }


}
