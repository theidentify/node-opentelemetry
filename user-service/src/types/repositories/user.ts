import * as Schema from '../../schema';
import * as Errors from '../errors/user-errors';

type UserSchema = Schema.UserSchema.Schema;

export type UserRepository = {
  create: (
    data: Schema.UserSchema.CreateSchema
  ) => Promise<UserSchema | Errors.CreateUserError>;
  findMany: () => Promise<UserSchema[]>;
  findById: (
    id: Schema.Branded.UserId
  ) => Promise<UserSchema | Errors.FindUserError>;
  findManyWithRelations: () => Promise<Schema.UserWithRelationsSchema.SchemaArray>;
  findByIdWithRelations: (
    id: Schema.Branded.UserId
  ) => Promise<Schema.UserWithRelationsSchema.Schema | Errors.FindUserError>;
  update: (
    id: Schema.Branded.UserId,
    data: Schema.UserSchema.UpdateSchema
  ) => Promise<UserSchema | Errors.UpdateUserError>;
  remove: (
    id: Schema.Branded.UserId
  ) => Promise<UserSchema | Errors.RemoveUserError>;
};
