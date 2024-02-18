import { environment } from './environments/environment';

export const apiConfig = {
  baseUrl : environment.apiUrl,
  login: 'auth/login',
  register: 'auth/register',
  userActions: 'users'
};
