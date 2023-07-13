import { Component, NgModule, Optional, ViewChild } from '@angular/core';
import { schedulerProConfig, projectConfig } from '@app/app.config';
import { GlobalService } from '@app/services/global.service';
import { StorageService } from '@app/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import {
  BryntumSchedulerProComponent,
  BryntumProjectModelComponent,
} from '@bryntum/schedulerpro-angular';
import { LocaleHelper } from '@bryntum/schedulerpro/schedulerpro.module.js';
import { LocaleManager } from '@bryntum/schedulerpro/schedulerpro.module.js';

import { ViewPreset, SchedulerPro, DateHelper } from '@bryntum/schedulerpro';

import { ILoadedOrders } from '@app/shared/models/planner.interface';
import { SchedulerUnits } from '@app/core/consts';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  constructor(
    public globalService: GlobalService,
    private storage: StorageService,

    @Optional() public dialogRef: MatDialogRef<SchedulerComponent>
  ) {}
  private sub: Subscription = new Subscription();
  public dataSource;
  public showDialog: boolean = false;
  public displayedColumns = ['name', 'value'];

  public monthAndYear2 = new ViewPreset({
    id: 'monthAndYear2', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
    name: 'monthAndYear2', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.
    rowHeight: 24, // Only used in horizontal orientation
    displayDateFormat: 'Y-m-d', // Controls how s will be displayed in tooltips etc
    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'week', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    defaultSpan: 8, // By default, if no end  is supplied to a view it will show 12 hours
    timeResolution: {
      // s will be snapped to this resolution
      unit: 'week', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
      increment: 1,
    },
    headers: [
      {
        // For each row you can define "unit", "increment", "Format", "renderer", "align", and "scope"
        unit: 'month',
        align: 'center',
        Format: 'M Y',
      },
      // This defines your header, you must include a "middle" object, and top/bottom are optional.
      {
        unit: 'week',
        align: 'center',
        Format: 'W M Y',
        renderer: function (start, end, cfg) {
          return (
            DateHelper.getShortNameOfUnit('week') +
            '.' +
            DateHelper.format(start, 'W M Y')
          );
        },
      },
    ],
  });

  public dayAndWeek2 = new ViewPreset({
    id: 'dayAndWeek2', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
    name: 'dayAndWeek2', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.
    rowHeight: 24, // Only used in horizontal orientation
    displayDateFormat: 'Y-m-d', // Controls how s will be displayed in tooltips etc
    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'day', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    defaultSpan: 4, // By default, if no end  is supplied to a view it will show 12 hours
    timeResolution: {
      // s will be snapped to this resolution
      unit: 'day', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
      increment: 1,
    },
    headers: [
      // This defines your header, you must include a "middle" object, and top/bottom are optional.
      {
        unit: 'week',
        Format: 'W M Y',
        renderer: function (start, end, cfg) {
          return (
            DateHelper.getShortNameOfUnit('week') +
            '.' +
            DateHelper.format(start, 'W M Y')
          );
        },
      },

      {
        // For each row you can define "unit", "increment", "Format", "renderer", "align", and "scope"
        unit: 'day',
        align: 'center',
        Format: 'D d M',
        renderer: function (start, end, headerConfig) {
          var hStoreData = this.storage.getData('holidays');
          var date1 =
            start.getDate().toString() +
            start.getMonth().toString() +
            start.getFullYear().toString();
          for (var i = 0; i < hStoreData.length; i++) {
            var date2 =
              hStoreData[i].StartDate.getDate().toString() +
              hStoreData[i].StartDate.getMonth().toString() +
              hStoreData[i].StartDate.getFullYear().toString();
            if (date1 == date2) {
              var cls = 'FriSatHeaderClass';
            }
          }

          // Simple alternating month in bold
          return (
            '<div class="' +
            cls +
            '">' +
            DateHelper.format(start, 'D d M') +
            '</div>'
          );
        },
      },
    ],
  });

  public hourAndDay2 = new ViewPreset({
    id: 'hourAndDay2', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
    name: 'hourAndDay2', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.
    rowHeight: 50, // Only used in horizontal orientation
    displayDateFormat: 'd/m/Y H:i:s', // Controls how s will be displayed in tooltips etc
    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'hour', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
    defaultSpan: 1, // By default, if no end  is supplied to a view it will show 12 hours
    timeResolution: {
      // s will be snapped to this resolution
      unit: 'hour', // Valid values are "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR".
      increment: 1,
    },
    headers: [
      // This defines your header, you must include a "middle" object, and top/bottom are optional.
      {
        unit: 'day',
        Format: 'D d/m/Y',
      },

      {
        // For each row you can define "unit", "increment", "Format", "renderer", "align", and "scope"
        unit: 'hour',
        Format: 'G',
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
  //     start: '2023-07-01',
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
  public newend = null;

  @ViewChild('schedulerpro')
  schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;

  ngOnInit() {
    this.sub.add(
      this.globalService.getLoadedOrders$().subscribe((data) => {
        console.log(data, 'loadedOrders');
        data.sort((a, b) => a.resourceId.localeCompare(b.resourceId));
        console.log('sortData', data);
        for (var i = 0; i < data.length; i++) {
          this.newstart = null;
          this.calcEvents.push(this.sortAllOrders(data[i], data[i - 1]));
        }
        this.events = this.calcEvents;
        console.log('calcEvents', this.calcEvents);
        for (var i = 0; i < data.length; i++) {
          this.assignments.push({
            event: data[i].name,
            resource: data[i].resourceId,
          });
        }
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
    // var durationInMin = this.getEventDuration(
    //   event.startDate,
    //   event,
    //   event.resourceId
    // );
    var durationInMin = 200;
    var allowHday = false;
    var LastdurationInMin = 0;

    if (oldEvent != null && event.resourceId == oldEvent.resourceId) {
      this.newstart = DateHelper.add(
        oldEvent.endDate,
        1,
        SchedulerUnits.MINUTE
      );
    } else {
      this.newstart = DateHelper.add(event.startDate, 1, SchedulerUnits.MINUTE);
    }
    // if (event.resourceId == '02' && event.name == '7092534') {

    //   var Sch_util_ = locale.Helper;

    //   durationInMin = 6396;
    // }
    this.newend = DateHelper.add(
      this.newstart,
      durationInMin,
      SchedulerUnits.MINUTE
    );
    if (durationInMin > LastdurationInMin) {
      var LastnextSeqStart = this.newend;
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
  getEventDuration(startDate: any, eventRec: any, ResourceID: any): number {
    var me = this;
    var durationInMin = eventRec.Duration * 60;
    if (eventRec.openedReported) return durationInMin;
    var availabilityStore = this.storage.getData('availability');
    var availability = [];
    var rec = {};
    for (let i = 0; i < availabilityStore.length; i++) {
      if (
        availabilityStore[i].ResourceId === ResourceID &&
        (availabilityStore[i].Cls === 'lunch' ||
          availabilityStore[i].Cls === 'rep-lunch')
      ) {
        const rec = {
          StartDate: availabilityStore[i].StartDate,
          EndDate: availabilityStore[i].EndDate,
        };
        availability.push(rec);
      }
    }
    if (!eventRec.allowHday) {
      var holidaysArr = this.storage.getData('holidays');
      for (let i = 0; i < holidaysArr.length; i++) {
        rec = {
          StartDate: holidaysArr[i].StartDate,
          EndDate: holidaysArr[i].EndDate,
        };
        availability.push(rec);
      }
    }
    var endDate = DateHelper.add(
      startDate,
      durationInMin,
      SchedulerUnits.MINUTE
    );
    var startDateTS = new Date(startDate).getTime();
    var endDateTS = endDate.getTime();
    var newDuration = durationInMin;
    //availability.sort(me.compareAvailability);
    for (let i = 0; i < availability.length; i++) {
      var availStartDate = availability[i].StartDate;
      var availEndDate = availability[i].EndDate;
      var availStartTs = new Date(availStartDate).getTime();
      var availEndTs = new Date(availEndDate).getTime();

      if (
        (endDateTS >= availStartTs && endDateTS <= availEndTs) ||
        (startDateTS < availStartTs && endDateTS > availEndTs)
      ) {
        var diffMs = availEndDate - availStartDate; // milliseconds between now & Christmas
        newDuration = Math.round(diffMs / 60000) + newDuration;
        endDate = DateHelper.add(
          startDate,
          durationInMin,
          SchedulerUnits.MINUTE
        );
        endDateTS = endDate.getTime();
      }
    }
    if (newDuration != durationInMin) {
      return newDuration;
    } else {
      return durationInMin;
    }
  }
  compareAvailability(a: any, b: any): number {
    if (a.StartDate < b.StartDate) {
      return -1;
    }
    if (a.StartDate > b.StartDate) {
      return 1;
    }

    return 0;
  }

  public closeDialog(): void {
    this.showDialog = false;
  }
  onEventClick(e: any): void {
    this.dataSource = Object.entries(e.eventRecord.data).map((o) => {
      return { name: o[0], value: JSON.stringify(o[1]) };
    });
    this.showDialog = true;
  }

  //   checkLunch (start:any, durationInMin:any, resource:any, eventRec:any) : {
  //     const helperInst = Helper.add(new (), 2, SchedulepackarUnits.MINUTE);
  //     debugger;

  //     if (eventRec.openedReported) return start;

  //     var availabilityStore = this.storage.getData('availabilityStore');
  //     if (!availabilityStore) return start

  //     var availability = [];

  //     availabilityStore.each(function (record, id) {
  //         if (record.get('ResourceId') == resource &&
  //             (record.get('Cls') == 'lunch' || record.get('Cls') == 'rep-lunch')) {
  //             availability.push(record);
  //         }
  //     });

  //     if (!availability || availability.length === 0) return start;

  //     debugger;
  //     var Sch_util_ = locale.Helper;

  //     var end = Sch_util_.add(start, Sch_util_.MINUTE, durationInMin);

  //     var startTS = start.getTime();
  //     var endTS = end.getTime();

  //     var new = false;

  //     for (var i = 0, l = availability.length; i < l; i++) {

  //         var availStartTs = availability[i].getStart().getTime();
  //         var availEndTs = availability[i].getEnd().getTime();

  //         if (eventRec && (eventRec.data.openedReported || eventRec.data.Name == 9)) {
  //             if (startTS >= availStartTs && startTS <= availEndTs ||
  //                 endTS >= availStartTs && endTS <= availEndTs ||
  //                 startTS < availStartTs && endTS > availEndTs) {
  //                 availability[i].data.Cls = '';
  //             }
  //             continue;
  //         }

  //         if (startTS >= availStartTs && startTS <= availEndTs) {

  //             new = availability[i].getEnd();
  //             startTS = availEndTs;
  //             end = Sch_util_.add(availability[i].getEnd(), Sch_util_.MINUTE, durationInMin);
  //             endTS = end.getTime();

  //         }
  //     }

  //     if (new == false) {
  //         return start;
  //     } else {
  //         return Sch.util..add(new, Sch.util..MINUTE, 1);
  //     }

  // };
}
