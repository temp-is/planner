import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { schedulerProConfig, projectConfig } from '@app/app.config';
import { GlobalService } from '@app/services/global.service';
import { StorageService } from '@app/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import { CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';

import {
  BryntumSchedulerProComponent,
  BryntumProjectModelComponent,
} from '@bryntum/schedulerpro-angular';
import {
  ViewPreset,
  SchedulerPro,
  DragHelper,
  DomClassList,
} from '@bryntum/schedulerpro';
import {
  ILoadedOrders,
  IUnloadedOrders,
} from '@app/shared/models/planner.interface';
import { Toast } from '@bryntum/schedulerpro/schedulerpro.umd.js'; // Adjust the import path as needed
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MyDrag } from '@app/core/services/my-drag';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  dropTargetRef: any;
  constructor(
    public globalService: GlobalService,
    private storage: StorageService
  ) {
    this.onChange = this.onChange.bind(this);
  }
  private sub: Subscription = new Subscription();

  public viewPreset = new ViewPreset({
    id: 'hourAndDay2', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
    name: 'hourAndDay2', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.
    rowHeight: 50, // Only used in horizontal orientation
    displayDateFormat: 'd/m/Y H:i:s', // Controls how dates will be displayed in tooltips etc
    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'hour', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    defaultSpan: 1, // By default, if no end date is supplied to a view it will show 12 hours
    timeResolution: {
      // Dates will be snapped to this resolution
      unit: 'hour', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
      increment: 1,
    },

    headers: [
      // This defines your header, you must include a "middle" object, and top/bottom are optional.
      {
        unit: 'day',
        dateFormat: 'D d/m/Y',
      },
      {
        // For each row you can define "unit", "increment", "dateFormat", "renderer", "align", and "scope"
        unit: 'hour',
        dateFormat: 'G',

        renderer: function (start, end, headerConfig) {
          var hour = start.getHours();
          var cls;
          if (7 <= hour && hour < 16) {
            cls = 'shift1';
          }
          if (16 <= hour && hour <= 23) {
            cls = 'shift2';
          }
          if (0 <= hour && hour < 7) {
            cls = 'shift3';
          }
          // Simple alternating month in bold
          return '<div class="shiftT ' + cls + '">' + hour + '</div>';
        },
      },
    ],
  });
  public resources = [];
  public calcEvents = [];
  public events = [];

  // resources = [
  //   { id: 1, name: 'Dan Stevenson' },
  //   { id: 2, name: 'Talisha Babin' },
  // ];

  // events = [
  //   {
  //     id: 1,
  //     startDate: '2023-07-01',
  //     duration: 3,
  //     name: 'Event 1',
  //   },
  //   { id: 2, duration: 4, name: 'Event 2' },
  // ];

  assignments: Array<{ event: string; resource: string }> = [];

  dependencies: Array<{ fromEvent: string; toEvent: string }> = [];

  schedulerProConfig = schedulerProConfig;
  projectConfig = projectConfig;
  SchedulerPro: SchedulerPro;
  resourceId: string;
  public oldEvent = null;
  public newstart = null;
  public newend = new Date();
  public dd: DragHelper;

  @ViewChild('schedulerpro')
  schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;
  @ViewChild('dropTarget') dropTarget!: any;

  ngOnInit() {
    setTimeout(() => {
      console.log(this.schedulerProComponent);
      // this.schedulerProComponent.onEventDrop.subscribe((data) => {
      //   debugger;
      // });

      const drag = new MyDrag(this.SchedulerPro);
    }, 3000);

    this.sub.add(
      this.globalService.getOrderNumber$().subscribe((data) => {
        //debugger;
        this.onChange({ value: data });
      })
    );

    this.sub.add(
      this.globalService.getOrderFromUnloaded$().subscribe((data) => {
        //debugger;
        this.onDropFromUnloadedOrders({ value: data });
      })
    );

    //debugger;
    this.sub.add(
      this.globalService.getLoadedOrders$().subscribe((data) => {
        console.log(data, 'loadedOrders');
        data.sort((a, b) => a.resourceId.localeCompare(b.resourceId));
        console.log('sortData', data);
        for (var i = 0; i < data.length; i++) {
          this.newstart = null;
          this.calcEvents.push(this.sortAllOrders(data[i], data[i - 1]));
          //check the color of the order
        }

        this.events = this.calcEvents;

        console.log('calcEvents', this.calcEvents);
        for (var i = 0; i < data.length; i++) {
          this.assignments.push({
            event: data[i].name,
            resource: data[i].resourceId,
          });
        }
        console.log('assignments:');
        console.log(this.assignments);
        this.globalService.progressBar = false;
      })
    );
    this.sub.add(
      this.globalService.getResurces$().subscribe((data) => {
        //  console.log(data, 'resurces');
        this.resources = data;
      })
    );
  }
  sortAllOrders(event: any, oldEvent: any): ILoadedOrders {
    var durationInMin = this.getEventDuration(event);
    var allowHday = false;
    var LastdurationInMin = 0;

    if (oldEvent != null && event.resourceId == oldEvent.resourceId) {
      this.newstart = new Date(oldEvent.endDate);
      this.newstart = new Date(
        this.newstart.setMinutes(this.newstart.getMinutes() + 1)
      );
    } else {
      this.newstart = new Date(event.startDate);
      this.newstart = new Date(
        this.newstart.setMinutes(this.newstart.getMinutes() + 1)
      );
    }
    this.newend = new Date(this.newstart);
    this.newend = new Date(
      this.newend.setMinutes(this.newend.getMinutes() + durationInMin)
    );

    if (durationInMin > LastdurationInMin) {
      var LastnextSeqStartDate = this.newend;
      LastdurationInMin = durationInMin;
    }
    if (event.allowHday == true) allowHday = true;
    event.startDate = this.newstart;
    event.endDate = this.newend;
    return event;
  }

  ngOnDestry() {
    this.sub.unsubscribe();
  }

  getEventDuration(eventRec: any): number {
    var durationInMin = eventRec.Duration * 60;

    if (eventRec.openedReported) return durationInMin;

    var availabilityStore = this.storage.getData('availability');
    var availability = [];
    var rec = {};
    for (var i = 0; i < availabilityStore.length; i++) {
      if (
        availabilityStore[i].resourceId == eventRec.resourceID &&
        (availabilityStore[i].Cls == 'lunch' ||
          availabilityStore[i].Cls == 'rep-lunch')
      ) {
        rec = {
          startDate: availabilityStore[i].startDate,
          endDate: availabilityStore[i].endDate,
        };
        availability.push(rec);
      }
    }

    if (!eventRec.allowHday) {
      var holidaysArr = this.storage.getData('holidays');
      for (var i = 0, l = holidaysArr.length; i < l; i++) {
        rec = {
          startDate: holidaysArr[i].startDate,
          endDate: holidaysArr[i].endDate,
        };
        availability.push(rec);
      }
    }

    var endDate = new Date(eventRec.startDate);
    endDate = new Date(
      endDate.setMinutes(endDate.getMinutes() + durationInMin)
    );
    var startDateTS = new Date(eventRec.startDate).getTime();
    var endDateTS = endDate.getTime();
    var newDuration = durationInMin;

    //availability.sort(this.compareAvailability);

    for (var i = 0, i = availability.length; i < l; i++) {
      var availStartDate = availability[i].startDate;
      var availEndDate = availability[i].endDate;
      var availStartTs = availStartDate.getTime();
      var availEndTs = availEndDate.getTime();

      if (
        (endDateTS >= availStartTs && endDateTS <= availEndTs) ||
        (startDateTS < availStartTs && endDateTS > availEndTs)
      ) {
        var diffMs = availEndDate - availStartDate; // milliseconds between now & Christmas
        newDuration = Math.round(diffMs / 60000) + newDuration;
        endDate = new Date(eventRec.startDate);
        endDate.setMinutes(endDate.getMinutes() + newDuration);
        endDateTS = endDate.getTime();
      }
    }

    if (newDuration != durationInMin) {
      return newDuration;
    } else {
      return durationInMin;
    }
  }

  onChange({ value }) {
    let value1 = value.value;
    value1 = value1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (value.kind === 'id') {
      if (value1 !== '') {
        var e = [];
        for (var i = 0, l = this.events.length; i < l; i++) {
          if (this.events[i].name === value1) {
            this.events[i].eventStyle = 'colored';
            //this.events[i].eventStyle = 'border';
          } else {
            this.events[i].eventStyle = '';
          }
          e.push(this.events[i]);
        }

        this.events = e;
      } else {
        this.events = this.storage.getData('loadedOrders');
      }
    } else {
      if (value1 !== '') {
        var e = [];
        for (var i = 0, l = this.events.length; i < l; i++) {
          if (this.events[i].itemDesc === value.value) {
            this.events[i].eventStyle = 'colored';
            //this.events[i].eventStyle = 'border';
          } else {
            this.events[i].eventStyle = '';
          }
          e.push(this.events[i]);
        }

        this.events = e;
      } else {
        this.events = this.storage.getData('loadedOrders');
      }
    }
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    const droppedOrderId = event.item.data;
    console.log('Dropped Order ID:', droppedOrderId);

    // Perform any actions you need with the dropped order in the app-scheduler component
    // ...
  }

  public dropTable(event: CdkDragDrop<IUnloadedOrders[]>) {
    if (event.previousContainer === event.container) {
      // If the row is dropped back into the same container (table), do nothing
      return;
    }

    // Handle row dropping outside the table
    console.log('that ok');
    // moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    // this.dataSource.data = this.data;
  }

  onDropFromUnloadedOrders({ value }) {}
}
