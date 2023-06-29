import { Component, OnInit, ViewChild } from '@angular/core';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';
import {
  FieldSettingsComponent,
  IFieldSettings,
} from '../field-settings/field-settings.component';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent implements OnInit {
  public initialAppData: IInitialData;
  public fieldSettingsArray: FieldSettingsComponent;
  @ViewChild(FieldSettingsComponent)
  fieldSettingsComponent!: FieldSettingsComponent;
  fieldSettingsArray1: IFieldSettings[] = [];

  private updatedDataFields: Array<any> = [];
  private flagFieldsArray: Array<any> = [];

  constructor(private globalService: GlobalService) {}

  onTableDataUpdated(updatedData: any[]) {
    // Handle the updated data here
    console.log(updatedData);
    this.updatedDataFields = updatedData;
    // You can perform further actions with the updated data, such as sending it to an API or manipulating it as needed.
  }

  onFlagFieldsUpdated(updatedData: any[]) {
    // Handle the updated data here
    console.log(updatedData);
    this.flagFieldsArray = updatedData;
    // You can perform further actions with the updated data, such as sending it to an API or manipulating it as needed.
  }

  ngOnInit(): void {
    this.globalService.getInitalAppData().subscribe((data) => {
      this.initialAppData = data;
    });
  }

  public updatecolumns() {
    console.log('field settings array: ', this.updatedDataFields);
    console.log('field settings array: ', this.flagFieldsArray);
    //debugger;
    this.globalService
      .updatecolumns(this.updatedDataFields, this.flagFieldsArray)
      .subscribe((data) => {});
  }
}
