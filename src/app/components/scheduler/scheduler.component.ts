import { Component, ViewChild } from '@angular/core';
import { schedulerConfig } from '@app/app.config';
import { GlobalService } from '@app/services/global.service';
import { StorageService } from '@app/services/storage.service';
import { ViewPreset } from '@bryntum/scheduler';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  constructor(
    private globalService: GlobalService,
    private storage: StorageService
  ) {}
  private sub: Subscription = new Subscription();

  public myViewPreset = new ViewPreset({
    id: 'myPreset', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'

    name: 'My view preset', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.
    // resourceColumnWidth: 160,
    tickWidth: 160, // Time column width in horizontal mode
    tickHeight: 24, // Time column height in vertical mode
    displayDateFormat: 'Y-m-d', // Controls how dates will be displayed in tooltips etc

    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'week', // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
    defaultSpan: 8, // By default, if no end date is supplied to a view it will show 12 hours

    timeResolution: {
      unit: 'week',
      increment: 1,
    },

    headers: [
      // This defines your header rows from top to bottom
      {
        unit: 'WEEK',
        align: 'center',
        dateFormat: 'W M Y',
        // renderer: function (start, end, cfg) {
        //      return Sch.util.Date.getShortNameOfUnit("WEEK") + '.' + Ext.Date.format(start, 'W M Y');
        // },
      },
      {
        unit: 'MONTH',
        align: 'center',
        dateFormat: 'M Y',
      },
    ],

    columnLinesFor: 1, // Defines header level column lines will be drawn for. Defaults to the last level.
  });

  public resources = [
    // { id: 1, name: 'Dan Stevenson' },
    // { id: 2, name: 'Talisha Babin' },
    // {
    //   id: 2,
    //   desc: 'HERMLE 02',
    //   Group: 'Prod',
    //   name: '02',
    // },
    // {
    //   id: 3,
    //   desc: 'HERMLE 03',
    //   Group: 'Prod',
    //   name: '03',
    // },
    // {
    //   id: 4,
    //   desc: 'HERMLE 04',
    //   Group: 'Prod',
    //   name: '04',
    // },
  ];

  public events = [
    { resourceId: '02', startDate: '2022-01-01', endDate: '2022-01-10' },
    { resourceId: '03', startDate: '2022-01-02', endDate: '2022-01-03' },
    { resourceId: '04', startDate: '2022-01-02', endDate: '2022-01-08' },
    { resourceId: '05', startDate: '2022-01-01', endDate: '2022-01-10' },
    { resourceId: '06', startDate: '2022-01-02', endDate: '2022-01-03' },
    { resourceId: '07', startDate: '2022-01-02', endDate: '2022-01-08' },
    { resourceId: '08', startDate: '2022-01-01', endDate: '2022-01-10' },
    { resourceId: '09', startDate: '2022-01-02', endDate: '2022-01-03' },
    { resourceId: '10', startDate: '2022-01-02', endDate: '2022-01-08' },
    { resourceId: '11', startDate: '2022-01-01', endDate: '2022-01-10' },
    { resourceId: '12', startDate: '2022-01-02', endDate: '2022-01-03' },
    { resourceId: '13', startDate: '2022-01-02', endDate: '2022-01-08' },
  ];

  schedulerConfig = schedulerConfig;

  @ViewChild('scheduler') schedulerComponent!: BryntumSchedulerComponent;

  ngOnInit() {
    this.sub.add(
      this.globalService.getLoadedOrders$().subscribe((data) => {
        console.log(data, 'loadedOrders');
        // this.events = data;
      })
    );
    this.sub.add(
      this.globalService.getResurces$().subscribe((data) => {
        console.log(data, 'resurces');
        this.resources = data;
      })
    );
  }

  ngOnDestry() {
    this.sub.unsubscribe();
  }
}
