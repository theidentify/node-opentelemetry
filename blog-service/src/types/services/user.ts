import { Branded, UserSchema } from '../../schema';
import * as Errors from '../errors/user-errors';

type UserSchema = UserSchema.Schema;

export type UserService = {
  findMany: () => Promise<UserSchema[] | Errors.FindManyUserError>;
  findById: (id: Branded.UserId) => Promise<UserSchema | Errors.FindUserError>;
};
