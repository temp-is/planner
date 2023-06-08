import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import {
  Factory,
  IMachine,
  Machine,
  WorkCenter,
  WorkCenterType,
} from 'src/app/shared/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-work-center',
  templateUrl: './select-work-center.component.html',
  styleUrls: ['./select-work-center.component.scss'],
})
export class SelectWorkCenterComponent {
  public factoriesArray: Array<Factory> = [];
  public workCentersArray: Array<WorkCenter> = [];
  public WorkCenterTypeArray: Array<WorkCenterType> = [];
  public machineArray: Array<IMachine> = [];

  constructor(private globalService: GlobalService, public dialog: MatDialog) {}

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
    this.globalService.getWorkCenter().subscribe((data) => {
      this.WorkCenterTypeArray = data.type;
      this.workCentersArray = data.wc;
    });
    this.globalService.getMachine().subscribe((data) => {
      this.machineArray = data;
    });
    //  const dialogRef = this.dialog.open(SelectWorkCenterComponent, {});
    //  dialogRef.afterClosed().subscribe((result) => {
    //    console.log('The dialog was closed');
    //  });
  }
}
