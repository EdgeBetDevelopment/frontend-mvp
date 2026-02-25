import { IUser } from '@/types/auth';

export interface UpdateMeDto {
  email?: string;
  username?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface Subscription {
  id: number;
  type_id: number;
  type?: { name?: string };
  status: string;
  created_at: string;
}

export interface ProfileUser extends IUser {
  subscriptions?: Subscription[];
}
