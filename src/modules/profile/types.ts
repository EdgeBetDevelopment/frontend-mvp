export interface UpdateMeDto {
  email?: string;
  username?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}
