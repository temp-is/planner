import { Component, ViewChild } from '@angular/core';
import { schedulerConfig } from '@app/app.config';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  resources = [
    { id: 1, name: 'Dan Stevenson' },
    { id: 2, name: 'Talisha Babin' },
  ];

  events = [
    { resourceId: 1, startDate: '2022-01-01', endDate: '2022-01-10' },
    { resourceId: 2, startDate: '2022-01-02', endDate: '2022-01-09' },
  ];

  schedulerConfig = schedulerConfig;

  @ViewChild('scheduler') schedulerComponent!: BryntumSchedulerComponent;
}
