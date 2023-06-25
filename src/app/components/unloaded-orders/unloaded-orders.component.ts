import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';
import { IUnloadedOrders } from 'src/app/shared/models';

@Component({
  selector: 'app-unloaded-orders',
  templateUrl: './unloaded-orders.component.html',
  styleUrls: ['./unloaded-orders.component.scss'],
})
export class UnloadedOrdersComponent {
  private sub: Subscription = new Subscription();

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

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

  constructor(
    private globalService: GlobalService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub.add(
      this.globalService.getUnloadedOrders$().subscribe((data) => {
        this.dataSource.data = data['records'];
      })
    );
  }

  ngOnDestry() {
    this.sub.unsubscribe();
  }
}
