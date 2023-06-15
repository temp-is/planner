import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { IFactory, IMachine, IWorkCenter } from 'src/app/shared/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';

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
    private storage: StorageService
  ) {}

  numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  onFactoryChange(factoryId: string): void {
    this.globalService.getWorkCenter().subscribe((data) => {
      this.workCentersArray = data;
    });
  }
  onWorkCenterChange(workCenterId: string): void {
    this.globalService.getMachine().subscribe((data) => {
      this.machineArray = data;
    });
  }

  ngOnInit() {
    this.showComponent = true;
    this.factoriesArray = this.storage.getData('factorylist');
  }

  public onSubmit(loginForm: NgForm): void {
    this.showComponent = false;
    this.globalService.createWorkcenterData(loginForm.value);
  }
}
