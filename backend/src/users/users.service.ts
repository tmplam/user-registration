import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserRequest } from './dtos/create-user-request.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserRequest: CreateUserRequest): Promise<User | null> {
    const existedUser = await this.findByEmail(createUserRequest.email);
    if (existedUser) {
      return null;
    }

    const createdUser = await new this.userModel(createUserRequest).save();
    return createdUser.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
