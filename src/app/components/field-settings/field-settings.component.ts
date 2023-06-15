import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.scss'],
})
export class FieldSettingsComponent {
  displayedColumns: string[] = [
    'Active',
    'desc',
    'descLocal',
    'defaultMode',
    'width',
    'displayType',
  ];
  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(
    private globalService: GlobalService,
    private storage: StorageService,
    public dialog: MatDialog
  ) {
    globalService.initAppRequests().subscribe((data) => {
      const columnsData = this.storage.getData('userDetails')['columns'];
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
    });
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
}
