import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';
import { Column } from 'src/app/shared/models';

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

export interface IFieldSettings {
  active: string;
  descLocal: string;
  displayType: string;
  defaultMode: string;
  width: number;
  id: string;
}

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.scss'],
})
export class FieldSettingsComponent {
  static fieldSettingsArray(fieldSettingsArray: any) {
    throw new Error('Method not implemented.');
  }
  @Output() tableDataUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();
  element1: any;

  @Input() set initialAppData(initialAppData: IInitialData) {
    const columnsData = initialAppData.userDetails['columns'];
    this.ELEMENT_DATA = columnsData
      .filter((item: any) => item.iconURL === '')
      .map((item: any) => ({
        id: item.id,
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

  public fieldSettingsArray: IFieldSettings[] = [];

  constructor(public dialog: MatDialog) {}

  shouldDisplayCheckbox(element: any): boolean {
    return (
      element.displayType === 'Loaded Orders' ||
      element.displayType === 'Loaded + Unloaded Orders' ||
      element.displayType === 'Unloaded Orders'
    );
  }

  onCheckboxClicked(element: any) {
    console.log('active:');
    console.log(element.Active);
    console.log(element.active);
  }

  getFieldSettingsArray(): IFieldSettings[] {
    return this.fieldSettingsArray;
  }

  updatecolumns(element: any) {
    const elementtmp = { ...element };
    const newVariable: IFieldSettings = {
      active: '',
      descLocal: '',
      displayType: '',
      defaultMode: '',
      width: 0,
      id: '',
    };
    if (elementtmp.displayType === 'Loaded Orders')
      newVariable.displayType = 'L';
    if (elementtmp.displayType === 'Loaded + Unloaded Orders')
      newVariable.displayType = 'B';
    if (elementtmp.displayType === 'Unloaded Orders')
      newVariable.displayType = 'U';

    if (elementtmp.defaultMode === 'Yes') newVariable.defaultMode = 'Y';
    if (elementtmp.defaultMode === 'No') newVariable.defaultMode = '';

    if (elementtmp.Active === true) newVariable.active = '';
    if (elementtmp.Active === false) newVariable.active = 'N';

    newVariable.descLocal = elementtmp.descLocal;
    newVariable.id = elementtmp.id;
    newVariable.width = elementtmp.width;

    if (this.fieldSettingsArray.length === 0) {
      console.log('first added');
      console.log(newVariable);
      this.fieldSettingsArray.push(newVariable);
    } else {
      const existingIndex = this.fieldSettingsArray.findIndex(
        (element1) => element1.id === newVariable.id
      );

      if (existingIndex !== -1) {
        console.log('exist in the array');
        this.fieldSettingsArray[existingIndex] = newVariable;
        console.log('the index:');
        console.log(existingIndex);
      } else {
        console.log('pushed to the array ');
        this.fieldSettingsArray.push(newVariable);
      }
    }
    this.tableDataUpdated.emit(this.fieldSettingsArray);
    console.log('the array:');
    console.log(this.fieldSettingsArray);
  }

  onEnterPressed(element: any) {
    console.log(element.width);
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
    //
  }
}
