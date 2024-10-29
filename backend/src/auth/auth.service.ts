import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { saltOrRounds } from './constants';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = await this.usersService.create(createUserDto);
    const { password, ...data } = user;

    return data;
  }
}
