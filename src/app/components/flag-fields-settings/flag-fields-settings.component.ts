import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';

export interface PeriodicElement {
  editingLocalDesc: boolean;
  Active: boolean;
  descLocal: string;
}

export interface IFlagFieldsSettings {
  active: string;
  descLocal: string;
  id: string;
}

@Component({
  selector: 'app-flag-fields-settings',
  templateUrl: './flag-fields-settings.component.html',
  styleUrls: ['./flag-fields-settings.component.scss'],
})
export class FlagFieldsSettingsComponent {
  displayedColumns: string[] = ['Active', 'desc', 'descLocal'];
  ELEMENT_DATA: PeriodicElement[] = [];
  public flagFieldsSettingsArray: IFlagFieldsSettings[] = [];
  @Output() tableDataUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();
  element1: any;

  @Input() set initialAppData(initialAppData: IInitialData) {
    const columnsData = initialAppData.userDetails['columns'];
    this.ELEMENT_DATA = columnsData
      .filter((item: any) => item.iconURL !== '')
      .map((item: any) => ({
        id: item.id,
        Active: item.active,
        desc: item.desc,
        descLocal: item.descLocal,
      }));

    console.log(this.ELEMENT_DATA);
    const dataSource = this.ELEMENT_DATA;
  }

  updatecolumns(element: any) {
    console.log(element.Active);
    const newVariable: IFlagFieldsSettings = {
      active: '',
      descLocal: '',
      id: '',
    };

    const elementtmp = { ...element };

    if (elementtmp.Active === true) newVariable.active = '';
    if (elementtmp.Active === false) newVariable.active = 'N';

    newVariable.descLocal = elementtmp.descLocal;
    newVariable.id = elementtmp.id;

    if (this.flagFieldsSettingsArray.length === 0) {
      this.flagFieldsSettingsArray.push(newVariable);
    } else {
      const existingIndex = this.flagFieldsSettingsArray.findIndex(
        (element1) => element1.id === newVariable.id
      );

      if (existingIndex !== -1) {
        this.flagFieldsSettingsArray[existingIndex] = newVariable;
      } else {
        this.flagFieldsSettingsArray.push(newVariable);
      }
    }
    this.tableDataUpdated.emit(this.flagFieldsSettingsArray);
    console.log('the array:');
    console.log(this.flagFieldsSettingsArray);
  }

  private _initialAppData: IInitialData;

  get initialAppData(): IInitialData {
    return this._initialAppData;
  }

  constructor(public dialog: MatDialog) {}

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
