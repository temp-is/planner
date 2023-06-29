import { Component, NgModule, ViewChild } from '@angular/core';
import { schedulerProConfig, projectConfig } from '@app/app.config';
import { GlobalService } from '@app/services/global.service';
import { StorageService } from '@app/services/storage.service';
import { Subscription } from 'rxjs';
import {
  BryntumSchedulerProComponent,
  BryntumProjectModelComponent,
} from '@bryntum/schedulerpro-angular';
import { ViewPreset } from '@bryntum/schedulerpro';

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
    id: 'myPreset', // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'

    name: 'My view preset', // A human-readable name provided to be used in GUI, e.i. preset picker, etc.

    tickWidth: 120, // Time column width in horizontal mode
    tickHeight: 50, // Time column height in vertical mode
    displayDateFormat: 'Y-m-d', // Controls how dates will be displayed in tooltips etc
    shiftIncrement: 1, // Controls how much time to skip when calling shiftNext and shiftPrevious.
    shiftUnit: 'day', // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
    defaultSpan: 4, // By default, if no end date is supplied to a view it will show 12 hours

    timeResolution: {
      // Dates will be snapped to this resolution
      unit: 'day', // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
      increment: 1,
    },
    headers: [
      {
        unit: 'week',
        dateFormat: 'W M Y',
      },
      {
        unit: 'day',
        // Use different date format for top header 01.10.2020
        dateFormat: 'D',
        increment: 1,
      },
    ],
    columnLinesFor: 1, // Defines header level column lines will be drawn for. Defaults to the last level.
  });
  public resources = [];
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
  resourceId: string;

  @ViewChild('schedulerpro')
  schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;

  ngOnInit() {
    this.sub.add(
      this.globalService.getLoadedOrders$().subscribe((data) => {
        //console.log(data, 'loadedOrders');
        this.events = data;

        // for (var i = 0; i < data.length; i++) {
        //   this.dependencies.push({
        //     fromEvent: data[i].id,
        //     toEvent: data[i].resourceId,
        //   });
        // };

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

  ngOnDestry() {
    this.sub.unsubscribe();
  }
}
