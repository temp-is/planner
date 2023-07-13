import {
  SchedulerProConfig,
  ProjectModelConfig,
  SchedulerPro,
} from '@bryntum/schedulerpro';

export const projectConfig: Partial<ProjectModelConfig> = {
  // Empty project config
};
export const schedulerProConfig: Partial<SchedulerProConfig> = {
  draggable: false,
  columnLines: true,
  cls: 'staffscheduler',
  visibleZoomFactor: 1,
  minZoomLevel: 0,
  maxZoomLevel: 3,

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
    eventMenu: {
      items: {
        deleteEvent: false,
        unassignEvent: false,
        editEvent: false,
        copyEvent: false,
        cutEvent: false,
        splitEvent: false,
        unloadOrder: {
          text: 'Unload order',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        gal6: {
          text: 'GAL6',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        pdm: {
          text: 'PDM',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        allowHolidays: {
          text: 'Allow holidays',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        planndOrder: {
          text: 'Planned order',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        orderMachineByAtpDate: {
          text: 'Order machine By ATP Date',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        orderMachineByOpratinAtp: {
          text: 'Order machine By opration ATP',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        orderMachineByCommitmentDate: {
          text: 'Order machine By Commitment Date',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        setNewSequence: {
          text: 'Set new Sequence',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
        unionOrders: {
          text: 'Union orders',
          icon: 'b-fa b-fa-fw b-fa-flag',
          onItem({ eventRecord }) {
            eventRecord.flagged = true;
          },
        },
      },
    },
  },
};
