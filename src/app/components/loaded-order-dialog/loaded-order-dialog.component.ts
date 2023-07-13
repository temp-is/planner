import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-loaded-order-dialog',
  templateUrl: './loaded-order-dialog.component.html',
  styleUrls: ['./loaded-order-dialog.component.scss'],
})
export class LoadedOrderDialogComponent {
  @Output() onCloseDialog: EventEmitter<void> = new EventEmitter();

  @Input() set dataSource(dataSource: Array<any>) {
    if (!dataSource) return;
    console.log(dataSource);
    const nameObj = dataSource.find((item) => {
      return item.name === 'Name';
    });
    if (nameObj) {
      this.name = nameObj.value;
    }
    this._dataSource = new MatTableDataSource(dataSource);
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns: string[] = ['name', 'value'];

  public _dataSource: MatTableDataSource<any>;

  public name: string;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this._dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public closeDialog(): void {
    this.onCloseDialog.emit();
  }
}
