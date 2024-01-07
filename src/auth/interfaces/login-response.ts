import { User } from '.';

export interface LoginResponse {
  message: string;
  jwt: string;
  user: User;
}
