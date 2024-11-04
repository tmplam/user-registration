import { ObjectId } from 'mongoose';

export interface TokenPayload {
  sub: ObjectId | unknown;
  email: string;
}
