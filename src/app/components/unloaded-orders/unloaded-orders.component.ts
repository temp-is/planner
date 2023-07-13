import { ChangeDetectorRef, Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { StorageService } from 'src/app/services/storage.service';
import { IUnloadedOrders } from 'src/app/shared/models';
import {
  CdkDragDrop,
  CdkDragEnd,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-unloaded-orders',
  templateUrl: './unloaded-orders.component.html',
  styleUrls: ['./unloaded-orders.component.scss'],
})
export class UnloadedOrdersComponent {
  private sub: Subscription = new Subscription();
  row: any;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  public displayedColumns = [
    'itemNumber',
    'itemDesc',
    'id',
    'orderQuantity',
    'operation',
    'currentOper',
    'requestDate',
    'requestWeek',
    'promiseDate',
  ];
  public data = [];

  public dataSource = new MatTableDataSource<IUnloadedOrders>([]);

  constructor(
    private globalService: GlobalService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub.add(
      this.globalService.getUnloadedOrders$().subscribe((data) => {
        this.dataSource.data = data['records'];
        this.data = data['records'];
      })
    );
  }

  ngOnDestry() {
    this.sub.unsubscribe();
  }

  onDragStarted(event: CdkDragStart, row: any) {
    debugger;

    // Check if the drag started within the component
    if (
      !event.source.element.nativeElement.closest('your-component-selector')
    ) {
      event.source._dragRef.reset(); // Reset the drag item to its initial position
    }
  }

  onDragEnded(event: CdkDragEnd, componentId: string) {
    debugger;
  }

  private isEventInsideComponent(
    event: CdkDragEnd,
    componentId: string
  ): boolean {
    const targetElement = event.source.getRootElement();
    const componentElement = document.getElementById(componentId);

    if (!componentElement) {
      return false;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const componentRect = componentElement.getBoundingClientRect();

    return (
      targetRect.left >= componentRect.left &&
      targetRect.right <= componentRect.right &&
      targetRect.top >= componentRect.top &&
      targetRect.bottom <= componentRect.bottom
    );
  }

  drop(event: any, row: any) {
    debugger;
    const component = this;
    //moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  // drop(event: CdkDragDrop<IUnloadedOrders[]>, row: any) {
  //   debugger;
  //   moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  // }
}
