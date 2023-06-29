import { SchedulerProConfig, ProjectModelConfig } from '@bryntum/schedulerpro';

export const projectConfig: Partial<ProjectModelConfig> = {
  // Empty project config
};

export const schedulerProConfig: Partial<SchedulerProConfig> = {
  columns: [{ text: 'Name', field: 'desc', width: 160 }],
  // startDate: new Date(2022, 0, 1),
  // endDate: new Date(2024, 0, 10),
};
// export const schedulerConfig: Partial<SchedulerConfig> = {
//   columns: [{ text: 'Name', field: 'desc', width: 160 }],
//   onBeforeEventEditShow({ eventEdit, resourceRecord }) {
//     debugger;
//     eventEdit.attendeesField.max = resourceRecord.data.capacity;
//   },

// startDate: new Date(2023, 0, 6),
// endDate: new Date(2023, 0, 6),
//};

// const scheduler = new Scheduler({
//   appendTo: document.body,
//   startDate: new Date(2023, 0, 9, 8),
//   endDate: new Date(2023, 0, 11, 18),
//   viewPreset: {
//     base: "hourAndDay",
//     tickWidth: 100,
//     headers: [
//       {
//         unit: "day",
//         // use different date format for top header
//         dateFormat: " ddd DD.MM.YYYY",
//       },
//       {
//         unit: "hour",
//         dateFormat: "LT",
//       },
//     ],
//   },
//   resourceImagePath: "resources/",

//   crudManager: {
//     autoLoad: true,
//     loadUrl: "data/data.json",
//     eventStore: {
//       //modelClass: MeetingBookingModel,
//     },
//   },

//   columns: [
//     {
//       type: "resourceInfo",
//       text: "Room name",
//       width: 210,
//       showMeta: (room) => StringHelper.xss`Max ${room.capacity} people`,
//     },
//   ],
// });
