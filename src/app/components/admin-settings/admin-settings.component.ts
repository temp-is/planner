import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent {
  onTableDataUpdated(updatedData: any[]) {
    // Handle the updated data here
    console.log(updatedData);
    // You can perform further actions with the updated data, such as sending it to an API or manipulating it as needed.
  }

  public updatecolumns() {
    console.log('update columns clicked!!');
  }
}
