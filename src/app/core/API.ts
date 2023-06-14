import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

export const API: { [key: string]: any } = {
  userDetails: `${baseUrl}/XZ/planner/getuserdetails`,
  factorylist: `${baseUrl}/XZ/planner/getfactorylist`,
  appdefaults: `${baseUrl}/index/getappdefaults`,
};
