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
import { FormControl, NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

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

  inputValue: number = 0;
  counter: number = 0;
  maxCounter: number = 100;
  minCounter: number = 0;

  includeOfficeCheckBox: boolean = false;
  viewModeCheckBox: boolean = false;

  showComponent: boolean = false;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private storage: StorageService
  ) {}

  selectedFactory = 'option2';
  selectedWorkCenterType = 'option2';
  selectedWorkCenter = 'option2';

  onFactoryChange(factoryId: string): void {
    //todo change work center types and center
    //get info from service
  }
  ngOnInit() {
    this.showComponent = true;
    this.factoriesArray = this.storage.getData('factorylist');

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
  }
  public incrementCounter() {
    if (this.counter < this.maxCounter) {
      this.counter++;
    }
  }
  public decrementCounter() {
    if (this.counter > this.minCounter) {
      this.counter--;
    }
  }
  public onSubmit(loginForm: NgForm): void {
    debugger;
    this.showComponent = false;
    this.globalService.createWorkcenterData(loginForm.value);
  }
}
