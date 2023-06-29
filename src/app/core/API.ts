import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

export const API: { [key: string]: any } = {
  userDetails: `${baseUrl}index/getuserdetails`,
  factorylist: `${baseUrl}index/getfactorylist`,
  workcenterlist: `${baseUrl}index/getworkcenterlist`,
  machielist: `${baseUrl}index/getmachinelist`,
  unloadedOrders: `${baseUrl}index/getunloadedorders`,
  appdefaults: `${baseUrl}index/getappdefaults`,
  updatecolumns: `${baseUrl}index/updatecolumns`,
  changeusercompany: `${baseUrl}index/changeusercompany`,
};
