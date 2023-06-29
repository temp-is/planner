import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ICompany, IUserDetails } from 'src/app/shared/models';
import { ThisReceiver } from '@angular/compiler';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectWorkCenterComponent } from '../select-work-center/select-work-center.component';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName = 'User name';

  @Output() toggleVisibility: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  isVisible: boolean = false;

  public companyList: Array<ICompany> = [];
  public company: string = '';
  router: any;

  constructor(
    private globalService: GlobalService,
    private storage: StorageService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    globalService.getInitalAppData().subscribe((data) => {
      //console.log(data);

      //************************* */
      //this is commented out because we moved it to global.servce.ts
      // this.storage.setData('userDetails', data['userDetails']);
      // this.storage.setData('factorylist', data['factorylist']);
      //************************* */
      this.companyList = data['userDetails']['connectedCompanies'];
      this.getUserDetails(data['userDetails']);
      console.log(data.factorylist);
      console.log(data.userDetails['columns']);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectWorkCenterComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public changeUserCompany(company: string) {
    const workcentercode =
      this.storage.getData('workCenter') !== undefined
        ? this.storage.getData('workCenter')
        : false;
    const unlock =
      this.storage.getData('workCenter') !== undefined
        ? this.storage.getData('userDetails').CanWrite
        : false;
    const clearMFP =
      this.storage.getData('workCenter') !== undefined ? true : false;
    console.log(company, workcentercode, unlock, clearMFP);
    //debugger;
    this.globalService
      .changeusercompany(company, workcentercode, unlock, clearMFP)
      .subscribe((data) => {});
  }

  public selectCompany(company: ICompany) {
    // Implement your logic here when a company is selected

    this.company = company.company + ' ' + company.desc;
    console.log('Selected company:', company.company);
    this.changeUserCompany(this.company);
  }

  public switchLang(language: string) {
    if (language == 'english') {
      console.log('choose write in english');
    } else console.log('else language');
  }

  public adminSettings() {
    console.log('Admin settings clicked');
    const dialogRef = this.dialog.open(AdminSettingsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public manualBtn() {
    console.log('manual buttun clicked');
    const link = document.createElement('a');
    link.href = '/Resources/Docs/PLANNER_MANUAL.pdf';
    link.target = '_blank';
    link.download = 'PLANNER_MANUAL.pdf';
    link.click();
  }

  public backToDefault() {
    const confirmation = confirm(
      'This action will cause the page to reload. Are you sure?'
    );
    if (confirmation) {
      // OK button was clicked
      // Call your function here
      console.log('5555555');
    } else {
      console.log('66666');
      // Cancel button was clicked or dialog was closed
      // Handle the cancel action or dialog close event here
    }
  }

  public logOut() {
    this.authService.logout();
  }

  public selectWC() {
    console.log('select work center clicked');
    this.router.navigate(['/select-work-center']);
  }
  public getUserDetails(data: IUserDetails) {
    this.company = data.company + ' ' + data.company_name;
    this.userName = data.username;
  }

  ngOnInit() {
    this.openDialog();
  }

  toggleComponentVisibility() {
    this.isVisible = !this.isVisible;
    this.toggleVisibility.emit(this.isVisible);
  }
}
