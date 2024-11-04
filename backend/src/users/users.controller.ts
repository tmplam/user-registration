import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { GetProfileResponse } from './dtos/get-profile-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: any) {
    const tokenPayload: TokenPayload = req['tokenPayload'];
    const user = await this.usersService.findByEmail(tokenPayload.email);

    const data: GetProfileResponse = {
      id: user!._id,
      email: user!.email,
      createdAt: user!.createdAt,
    };

    return {
      statusCode: 200,
      message: 'Successfully',
      data,
    };
  }
}
