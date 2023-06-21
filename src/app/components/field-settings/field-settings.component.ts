import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';

export interface PeriodicElement {
  editingDisplayType: boolean;
  editingLocalDesc: boolean;
  editingWidth: boolean;
  appName: string;
  Active: boolean;
  descLocal: string;
  defaultMode: boolean;
  width: string;
  displayType: string;
}

interface dType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.scss'],
})
export class FieldSettingsComponent {
  @Output() tableDataUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() set initialAppData(initialAppData: IInitialData) {
    const columnsData = initialAppData.userDetails['columns'];
    this.ELEMENT_DATA = columnsData
      .filter((item: any) => item.iconURL === '')
      .map((item: any) => ({
        Active: item.active,
        desc: item.desc,
        descLocal: item.descLocal,
        defaultMode: item.defaultMode === true ? 'Yes' : 'No',
        width: parseInt(item.width),
        displayType:
          item.displayType === 'B'
            ? 'Loaded + Unloaded Orders'
            : item.displayType === 'L'
            ? 'Loaded Orders'
            : item.displayType === 'U'
            ? 'Unloaded Orders'
            : '',
      }));

    console.log(this.ELEMENT_DATA);
    const dataSource = this.ELEMENT_DATA;
  }

  private _initialAppData: IInitialData;

  get initialAppData(): IInitialData {
    return this._initialAppData;
  }

  dtypes: dType[] = [
    { value: 'B', viewValue: 'Loaded + Unloaded Orders' },
    { value: 'L', viewValue: 'Loaded Orders' },
    { value: 'U', viewValue: 'Unloaded Orders' },
  ];

  displayedColumns: string[] = [
    'Active',
    'desc',
    'descLocal',
    'defaultMode',
    'width',
    'displayType',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(public dialog: MatDialog) {
    //DEPRECATED!!!
    // globalService.initAppRequests().subscribe((data) => {
    //   const columnsData = this.storage.getData('userDetails')['columns'];
    //   this.ELEMENT_DATA = columnsData
    //     .filter((item: any) => item.iconURL === '')
    //     .map((item: any) => ({
    //       Active: item.active,
    //       desc: item.desc,
    //       descLocal: item.descLocal,
    //       defaultMode: item.defaultMode === true ? 'Yes' : 'No',
    //       width: parseInt(item.width),
    //       displayType:
    //         item.displayType === 'B'
    //           ? 'Loaded + Unloaded Orders'
    //           : item.displayType === 'L'
    //           ? 'Loaded Orders'
    //           : item.displayType === 'U'
    //           ? 'Unloaded Orders'
    //           : '',
    //     }));
    //   console.log(this.ELEMENT_DATA);
    //   const dataSource = this.ELEMENT_DATA;
    // });
  }

  shouldDisplayCheckbox(element: any): boolean {
    return (
      element.displayType === 'Loaded Orders' ||
      element.displayType === 'Loaded + Unloaded Orders' ||
      element.displayType === 'Unloaded Orders'
    );
  }

  toggleLocalDescEditing(element: PeriodicElement) {
    this.ELEMENT_DATA.forEach((item) => {
      if (item !== element) {
        item.editingLocalDesc = false;
      }
    });
    element.editingLocalDesc = !element.editingLocalDesc;
  }

  toggleWidthEditing(element: PeriodicElement) {
    this.ELEMENT_DATA.forEach((item) => {
      if (item !== element) {
        item.editingWidth = false;
      }
    });
    element.editingWidth = !element.editingWidth;
  }

  updateTableData() {
    // Assuming your updated data is stored in an array called updatedData
    //const updatedData: any[] = /* your updated data */;
    // Emit the event with the updated data
    //this.tableDataUpdated.emit(updatedData);
  }
}
