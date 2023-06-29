import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkLoadedOrdersComponent } from '../mark-loaded-orders/mark-loaded-orders.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedular-toolbar',
  templateUrl: './schedular-toolbar.component.html',
  styleUrls: ['./schedular-toolbar.component.scss'],
})
export class SchedularToolbarComponent {
  showCheckboxSection = false;
  toppings: FormGroup;

  constructor(public dialog: MatDialog) {
    this.toppings = new FormGroup({
      pepperoni: new FormControl(false),
      extracheese: new FormControl(false),
      mushroom: new FormControl(false),
    });
  }

  public onReloadBtn() {}

  public onZoomOut() {}

  public onZoomIn() {}

  public onCurrentTime() {}

  public onMarkEvents() {
    this.showCheckboxSection = !this.showCheckboxSection;
  }

  public toolingStockWin() {}

  public setupEmployeeOnShiftWin() {}

  public onNonWorkingTime() {}

  public onNightSetup() {}

  public onLoadedOrdersGrid() {}

  public onShowIndexTooltip() {}

  public onSaveBtn() {}

  public onGotoOrderIdBtn(element: string) {
    if (element === '') {
      console.log('null');
      //return true;
    } else {
      console.log(element);
      //sched.gotoOrderId(element, 'search_mark');
    }
  }

  public onGotoOrderDscBtn(element: string) {
    if (element === '') {
      console.log('null');
    } else {
      console.log(element);
      //sched.gotoOrderId(element, 'search_mark');
    }
  }
}
