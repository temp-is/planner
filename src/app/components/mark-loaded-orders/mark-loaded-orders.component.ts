import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mark-loaded-orders',
  templateUrl: './mark-loaded-orders.component.html',
  styleUrls: ['./mark-loaded-orders.component.scss'],
})
export class MarkLoadedOrdersComponent {
  showCheckboxSection = false;
  toppings: FormGroup;

  constructor() {
    // Initialize the form group and form controls
    this.toppings = new FormGroup({
      pepperoni: new FormControl(false),
      extracheese: new FormControl(false),
      mushroom: new FormControl(false),
    });
  }

  onMarkEvents(): void {
    this.showCheckboxSection = !this.showCheckboxSection;
  }
}
