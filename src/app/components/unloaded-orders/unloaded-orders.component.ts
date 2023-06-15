import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';
import { IUnloadedOrders } from 'src/app/shared/models';

@Component({
  selector: 'app-unloaded-orders',
  templateUrl: './unloaded-orders.component.html',
  styleUrls: ['./unloaded-orders.component.scss'],
})
export class UnloadedOrdersComponent {
  public displayedColumns: string[] = [
    'itemNumber',
    'itemDesc',
    'id',
    'orderQuantity',
    'currentStation',
    'operation',
    'currentOper',
    'requestDate',
    'requestWeek',
    'promiseDate',
  ];

  public dataSource = new MatTableDataSource<IUnloadedOrders>([]);

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.getunloadedorders().subscribe((data) => {
      this.dataSource = new MatTableDataSource<IUnloadedOrders>(
        data['records']
      );
    });
  }
}
