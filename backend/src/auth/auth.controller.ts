import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequest } from '../users/dtos/create-user-request.dto';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserRequest: CreateUserRequest) {
    const data = await this.authService.register(createUserRequest);

    if (!data) {
      throw new BadRequestException('Email is already in use');
    }

    return {
      statusCode: 201,
      message: 'User registered successfully',
      data,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest) {
    const data: LoginResponse = await this.authService.login(loginRequest);

    if (!data) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      statusCode: 200,
      message: 'Login successfully',
      data,
    };
  }
}
