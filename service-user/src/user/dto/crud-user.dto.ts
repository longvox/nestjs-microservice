import { IsEmail, IsMobilePhone, IsString } from 'class-validator'

export class CRUDUserDto {
  @IsString()
  name: string;
  
  @IsString()
  @IsMobilePhone('vi-VN')
  phone: string;
  
  @IsString()
  @IsEmail()
  email: string;
}
