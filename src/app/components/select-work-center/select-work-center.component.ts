import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-work-center',
  templateUrl: './select-work-center.component.html',
  styleUrls: ['./select-work-center.component.scss'],
})
export class SelectWorkCenterComponent {
  public factories: Array<string> = [];
  public workCenterType: Array<string> = [];
  public workCenters: Array<string> = [];
  public machine: Array<string> = [];

  onFactoryChange(factoryId: string): void {
    //todo change work center types and center
    //get info from service
  }
}
