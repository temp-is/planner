import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

export const API: { [key: string]: any } = {
  userDetails: `${baseUrl}/index/getuserdetails`,
  factorylist: (page: number, limit: number) =>
    `${baseUrl}/index/getfactorylist/?page=${page}&limit=${limit}`,
  appdefaults: `${baseUrl}/index/getappdefaults`,
};
