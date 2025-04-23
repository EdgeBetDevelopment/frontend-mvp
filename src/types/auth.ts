export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp extends ILogin {
  username: string;
  phone_number: string;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  is_active: boolean;
  phone_number: string;
  id: number;
}

export interface IAuthRepsonse {
  user: IUser;
  access_token: string;
  refresh_token: string;
}
