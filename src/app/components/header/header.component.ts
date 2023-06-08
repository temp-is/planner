import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  company = '__:Company';
  userName = 'User name';

  public companyList: string[];
  router: any;

  constructor(private globalService: GlobalService) {}

  public changeUserCompany() {
    console.log('change user company');
  }

  public selectCompany(company: string) {
    // Implement your logic here when a company is selected
    this.company = company;
    console.log('Selected company:', company);
    this.changeUserCompany();
  }

  public setPlannerInEnglish(language: string) {
    if (language == 'english') {
      console.log('choose write in english');
    } else console.log('else language');
  }

  public manualBtn() {
    console.log('manual buttun clicked');
  }

  public backToDefault() {
    console.log('back to default');
  }

  public logOut() {
    console.log('log out clicked');
  }

  public adminSettings() {
    console.log('Admin settings clicked');
  }

  public selectWC() {
    console.log('select work center clicked');
    this.router.navigate(['/select-work-center']);
  }

  ngOnInit() {
    this.globalService.getUserDetails().subscribe((data) => {
      this.company = data.company + ' ' + data.company_name;
      this.userName = data.username;
    });

    this.globalService.getCompanies().subscribe((data) => {
      this.companyList = data;
    });
  }
}
