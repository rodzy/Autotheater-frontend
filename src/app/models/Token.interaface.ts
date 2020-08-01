import { Users } from './Users.interface';

export interface Token {
  access_token: string;
  token_type: string;
  user?: Users;
  expires_in: number;
}
