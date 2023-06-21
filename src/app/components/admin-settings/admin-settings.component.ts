import { Component, OnInit } from '@angular/core';
import { IInitialData } from 'src/app/core/models/inital-data.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent implements OnInit {
  public initialAppData: IInitialData;

  constructor(private globalService: GlobalService) {}

  onTableDataUpdated(updatedData: any[]) {
    // Handle the updated data here
    console.log(updatedData);
    // You can perform further actions with the updated data, such as sending it to an API or manipulating it as needed.
  }

  ngOnInit(): void {
    this.globalService.getInitalAppData().subscribe((data) => {
      this.initialAppData = data;
    });
  }

  public updatecolumns() {
    console.log('update columns clicked!!');
  }
}
