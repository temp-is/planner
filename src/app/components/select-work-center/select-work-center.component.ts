import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

interface FactoryDetails {
  Code: string;
  Name: string;
}

interface WorkCenterType {
  TpCode: string;
  TpName: string;
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

@Component({
  selector: 'app-select-work-center',
  templateUrl: './select-work-center.component.html',
  styleUrls: ['./select-work-center.component.scss'],
})
export class SelectWorkCenterComponent {
  public factories: Array<FactoryDetails> = [];
  public workCenterType: Array<WorkCenterType> = [];
  public workCenters: Array<workCenters> = [];
  public machine: Array<string> = [];

  constructor(private globalService: GlobalService) {}

  selectedFactory = 'option2';
  selectedWorkCenterType = 'option2';
  selectedWorkCenter = 'option2';

  onFactoryChange(factoryId: string): void {
    //todo change work center types and center
    //get info from service
  }

  ngOnInit() {
    this.globalService.getFactories().subscribe((data) => {
      this.factories = data;
    });

    this.globalService.getWorkCenter().subscribe((data) => {
      this.workCenterType = data.type;
      this.workCenters = data.wc;
    });
  }
}
