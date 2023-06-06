import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  company = '__:Company';
  userName = 'User name';

  public companyList: string[];

  constructor(private globalService: GlobalService) {}

  selectCompany(company: string) {
    // Implement your logic here when a company is selected
    this.company = company;
    console.log('Selected company:', company);
  }

  ngOnInit() {
    this.globalService.getCompanies().subscribe((data) => {
      this.companyList = data;
    });
  }
}
