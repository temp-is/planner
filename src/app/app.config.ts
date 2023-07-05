import { SchedulerProConfig, ProjectModelConfig } from '@bryntum/schedulerpro';

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
  features: {
    eventEdit: {
      editorConfig: {
        bbar: {
          items: {
            deleteButton: null,
          },
        },
      },
    },
  },
};
