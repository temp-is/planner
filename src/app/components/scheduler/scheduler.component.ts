import { Component, NgModule, ViewChild } from '@angular/core';
import { schedulerProConfig, projectConfig } from '@app/app.config';
import { GlobalService } from '@app/services/global.service';
import { StorageService } from '@app/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import {
  BryntumSchedulerProComponent,
  BryntumProjectModelComponent,
} from '@bryntum/schedulerpro-angular';
import { ViewPreset, SchedulerPro } from '@bryntum/schedulerpro';
import { ILoadedOrders } from '@app/shared/models/planner.interface';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  constructor(
    public globalService: GlobalService,
    private storage: StorageService
  ) {}
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
}
