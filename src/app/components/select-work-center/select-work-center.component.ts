import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import {
  Factory,
  Machine,
  WorkCenter,
  WorkCenterType,
} from 'src/app/shared/models';

@Component({
  selector: 'app-select-work-center',
  templateUrl: './select-work-center.component.html',
  styleUrls: ['./select-work-center.component.scss'],
})
export class SelectWorkCenterComponent {
  public factoriesArray: Array<Factory> = [];
  public workCentersArray: Array<WorkCenter> = [];
  public WorkCenterTypeArray: Array<WorkCenterType> = [];
  public machineArray: Array<Machine> = [];

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
      this.factoriesArray = data;
    });

    this.globalService.getWorkCenter().subscribe((data) => {
      this.WorkCenterTypeArray = data.type;
      this.workCentersArray = data.wc;
    });
  }
}
