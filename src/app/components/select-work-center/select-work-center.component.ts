import { Component, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { IFactory, IMachine, IWorkCenter } from 'src/app/shared/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { UnloadedOrdersComponent } from '../unloaded-orders/unloaded-orders.component';
import { DateHelper } from '@bryntum/schedulerpro';
import { SchedulerUnits } from '@app/core/consts/scheduler.utils';

@Component({
  selector: 'app-select-work-center',
  templateUrl: './select-work-center.component.html',
  styleUrls: ['./select-work-center.component.scss'],
})
export class SelectWorkCenterComponent {
  public factoriesArray: Array<IFactory> = [];
  public workCentersArray: Array<IWorkCenter> = [];
  public machineArray: Array<IMachine> = [];

  includeOfficeCheckBox: boolean = false;
  viewModeCheckBox: boolean = false;

  showComponent: boolean = false;

  constructor(
    private globalService: GlobalService,
    private storage: StorageService,
    // private unLoadOrdes: UnloadedOrdersComponent,
    @Optional() public dialogRef: MatDialogRef<SelectWorkCenterComponent>
  ) {}

  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  onFactoryChange(factoryId: string): void {
    this.globalService.getWorkCenter(factoryId).subscribe((data) => {
      this.workCentersArray = data;
    });
  }
  onWorkCenterChange(workCenterId: string): void {
    this.globalService.getMachine(workCenterId).subscribe((data) => {
      this.machineArray = data;
    });
  }

  ngOnInit() {
    this.showComponent = true;
    this.factoriesArray = this.storage.getData('factorylist');
  }

  public onSubmit(loginForm: NgForm): void {
    this.globalService.progressBar = true;
    this.dialogRef.close();
    //debugger;
    this.storage.setData('workCenter', loginForm.value.workCenter);
    this.showComponent = false;
    /**FOR DEBUG */
    // original:  loginForm.value
    // const formVal = loginForm.value
    const formVal = {
      factory: 'HR',
      workCenterType: null,
      workCenter: 'K4P',
      machine: null,
      numberOfOprationsBefore: null,
      includeOfficeCheckBox: false,
      viewModeCheckBox: false,
    };
    /**END DEBUG */

    this.globalService.createworkcenterdata(formVal).subscribe((data) => {
      console.log(data, 'createworkcenterdata');
    });
    this.globalService.getresourcestore(formVal).subscribe((data) => {
      this.globalService.setResurces$(data);
    });
    this.globalService.getavailability(formVal).subscribe((data) => {
      this.storage.setData('availability', data);
    });
    this.globalService.getHolidays(formVal).subscribe((data) => {
      var holidaysData = [];
      for (let i = 0; i < data.length; i++) {
        var holidayStartDate = new Date(data[i].HolidayDate);
        if (typeof data[i].EndHTime != 'undefined') {
          var holidayEndDate = new Date(
            data[i].HolidayDate + ',' + data[i].EndHTime
          );
        } else {
          var holidayEndDate = DateHelper.add(
            holidayStartDate,
            1,
            SchedulerUnits.MINUTE
          );
        }
        holidaysData.push({
          StartDate: holidayStartDate,
          StartDateTs: holidayStartDate.getTime(),
          EndDate: holidayEndDate,
          EndDateTs: holidayEndDate.getTime(),
          Type: 'Day off',
          Cls: 'myZoneStyle',
        });
      }

      this.storage.setData('holidays', holidaysData);
    });
    this.globalService.getunloadedorders(formVal).subscribe((data) => {
      this.globalService.setUnloadedOrders$(data);
    });
    this.globalService.getloadedorders(formVal).subscribe((data) => {
      this.globalService.setLoadedOrders$(data);
      this.storage.setData('loadedOrders', data);
    });
  }
}
