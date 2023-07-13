import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkLoadedOrdersComponent } from '../mark-loaded-orders/mark-loaded-orders.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
interface dType {
  value: string;
  kind: string;
}
@Component({
  selector: 'app-schedular-toolbar',
  templateUrl: './schedular-toolbar.component.html',
  styleUrls: ['./schedular-toolbar.component.scss'],
})
export class SchedularToolbarComponent {
  showCheckboxSection = false;
  toppings: FormGroup;
  elemen1: dType;

  constructor(public dialog: MatDialog, private globalService: GlobalService) {
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

  public onGotoOrderIdBtn(element: any) {
    debugger;
    this.elemen1 = {
      value: element,
      kind: 'id',
    };
    console.log(element);
    this.globalService.getOrderNumber(this.elemen1);
    //this.schedulerComponent.onChange(element);

    //sched.gotoOrderId(element, 'search_mark');
  }

  public onGotoOrderDscBtn(element: any) {
    debugger;
    this.elemen1 = {
      value: element,
      kind: 'dsc',
    };
    console.log(element);
    this.globalService.getOrderNumber(this.elemen1);
  }
}
