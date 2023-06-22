import { environment } from 'src/environments/environment';

export const AuthAPI: { [key: string]: any } = {
  login: `${environment.baseUrl}/authentication/validate`,
  logout: `${environment.baseUrl}/authentication/logout`,
  checkIdentity: `${environment.baseUrl}/authentication/hasidentity`,
};
