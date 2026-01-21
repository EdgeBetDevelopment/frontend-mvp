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
  is_2fa_enabled?: boolean; // deprecated
  two_fa?: {
    id: number;
    is_enabled: boolean;
  };
}

export interface IAuthRepsonse {
  user?: IUser;
  access_token: string;
  refresh_token: string;
  requires_2fa?: boolean;
  temp_token?: string;
  is_admin?: boolean;
  is_super_admin?: boolean;
}

// 2FA Types
export interface I2FAEnableResponse {
  qr_uri: string;
}

export interface I2FAConfirmResponse {
  backup_codes: string[];
}

export interface I2FARecoveryResponse {
  qr_uri: string;
}

export interface I2FALoginRequest {
  code: string;
  temp_token: string;
}
