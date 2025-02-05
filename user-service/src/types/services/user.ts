import { Branded, UserSchema, UserWithRelationsSchema } from '../../schema';
import * as Errors from '../errors/user-errors';

type UserSchema = UserSchema.Schema;

export type UserService = {
  create: (
    data: UserSchema.CreateSchema
  ) => Promise<UserSchema | Errors.CreateUserError>;
  update: (
    id: Branded.UserId,
    data: UserSchema.UpdateSchema
  ) => Promise<UserSchema | Errors.UpdateUserError>;
  findMany: () => Promise<UserSchema[] | Errors.FindManyUserError>;
  findById: (id: Branded.UserId) => Promise<UserSchema | Errors.FindUserError>;
  findByIdWithRelations: (
    id: Branded.UserId
  ) => Promise<UserWithRelationsSchema.Schema | Errors.FindUserError>;
  findManyWithRelations: () => Promise<
    UserWithRelationsSchema.SchemaArray | Errors.FindManyUserError
  >;
  remove: (id: Branded.UserId) => Promise<UserSchema | Errors.RemoveUserError>;
};
