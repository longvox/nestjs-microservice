import { BaseEntity, Entity, Column, Unique, PrimaryColumn } from 'typeorm';
import { IsEmail, IsMobilePhone } from 'class-validator';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsMobilePhone('vi-VN')
  phone: string;

  @PrimaryColumn()
  @Column()
  @IsEmail()
  email: string;
}
