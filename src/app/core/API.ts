import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

export const API: { [key: string]: string } = {
  userDetails: `${baseUrl}/index/getuserdetails`,
};
