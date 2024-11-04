import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from '../users/dtos/create-user-request.dto';
import { UsersService } from '../users/users.service';
import { authConstants } from './constants';
import { LoginRequest } from './dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserRequest: CreateUserRequest): Promise<any> {
    createUserRequest.password = await bcrypt.hash(
      createUserRequest.password,
      authConstants.saltOrRounds,
    );

    const user = await this.usersService.create(createUserRequest);

    if (user) {
      const { password, ...data } = user;
      return data;
    }
    return null;
  }

  async login(loginRequest: LoginRequest): Promise<any> {
    const user = await this.usersService.findByEmail(loginRequest.email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        loginRequest.password,
        user.password,
      );
      if (isPasswordMatch) {
        const payload: TokenPayload = { sub: user._id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return null;
  }
}
