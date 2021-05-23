import {IUser} from './user.interface';

export interface IRegisterForm{
  active?: boolean;
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthday: string;
  role?: string;
}

export interface IResultRegister{
  status: boolean;
  message: string;
  user?: IUser;
}
