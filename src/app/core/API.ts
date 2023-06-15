import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

export const API: { [key: string]: any } = {
  userDetails: `${baseUrl}/XZ/planner/getuserdetails`,
  factorylist: `${baseUrl}/XZ/planner/getfactorylist`,
  workcenterlist: `${baseUrl}/XZ/planner/getworkcenterlist`,
  machielist: `${baseUrl}/XZ/planner/getmachinelist`,
  unloadedOrders: `${baseUrl}/XZ/planner/getunloadedorders`,

  appdefaults: `${baseUrl}/index/getappdefaults`,
};
