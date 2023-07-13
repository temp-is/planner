import {
  SchedulerProConfig,
  ProjectModelConfig,
  DateHelper,
} from '@bryntum/schedulerpro';

export const projectConfig: Partial<ProjectModelConfig> = {
  // Empty project config
};
export const schedulerProConfig: Partial<SchedulerProConfig> = {
  columns: [{ text: 'Name', field: 'desc', width: 160 }],
  startDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ),
  endDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  ),

  listeners: {
    beforeDragCreate({ date }) {
      //debugger;
      // Prevent drag creating events in the past
      return date >= Date.now();
    },
    eventdragover: ({ event }) => {
      debugger;
      event.preventDefault();
    },
    eventdragenter: ({ event }) => {
      debugger;
      // Add your custom logic for when the draggable element enters the drop target
    },
    eventdragleave: ({ event }) => {
      debugger;
      // Add your custom logic for when the draggable element leaves the drop target
    },
    eventdrop: ({ event }) => {
      debugger;
      event.preventDefault();
      // Add your custom logic for handling the drop event on the drop target
    },
  },
  features: {
    eventDrag: {
      // A minimal start date tooltip
      tooltipTemplate: ({ eventRecord, startDate }) => {
        //debugger;
        return DateHelper.format(startDate, 'HH:mm');
      },
    },
  },
};
