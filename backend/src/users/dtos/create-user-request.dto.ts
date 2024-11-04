import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
