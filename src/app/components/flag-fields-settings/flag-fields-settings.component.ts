import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';

export interface PeriodicElement {
  editingLocalDesc: boolean;
  Active: boolean;
  descLocal: string;
}

@Component({
  selector: 'app-flag-fields-settings',
  templateUrl: './flag-fields-settings.component.html',
  styleUrls: ['./flag-fields-settings.component.scss'],
})
export class FlagFieldsSettingsComponent {
  displayedColumns: string[] = ['Active', 'desc', 'descLocal'];
  ELEMENT_DATA: PeriodicElement[] = [];

  @Input() set initialAppData(initialAppData: IInitialData) {
    const columnsData = initialAppData.userDetails['columns'];
    this.ELEMENT_DATA = columnsData
      .filter((item: any) => item.iconURL !== '')
      .map((item: any) => ({
        Active: item.active,
        desc: item.desc,
        descLocal: item.descLocal,
      }));

    console.log(this.ELEMENT_DATA);
    const dataSource = this.ELEMENT_DATA;
  }

  private _initialAppData: IInitialData;

  get initialAppData(): IInitialData {
    return this._initialAppData;
  }

  constructor(public dialog: MatDialog) {
    //DEPRECATED!!!
    // globalService.initAppRequests().subscribe((data) => {
    //   const columnsData = this.storage.getData('userDetails')['columns'];
    //   this.ELEMENT_DATA = columnsData
    //     .filter((item: any) => item.iconURL !== '')
    //     .map((item: any) => ({
    //       Active: item.active,
    //       desc: item.desc,
    //       descLocal: item.descLocal,
    //     }));
    //   console.log(this.ELEMENT_DATA);
    //   const dataSource = this.ELEMENT_DATA;
    // });
  }

  toggleLocalDescEditing(element: PeriodicElement) {
    this.ELEMENT_DATA.forEach((item) => {
      if (item !== element) {
        item.editingLocalDesc = false;
      }
    });
    element.editingLocalDesc = !element.editingLocalDesc;
  }

  shouldDisplayCheckbox(element: any): boolean {
    return (
      element.displayType === 'Loaded Orders' ||
      element.displayType === 'Loaded + Unloaded Orders' ||
      element.displayType === 'Unloaded Orders'
    );
  }
}
