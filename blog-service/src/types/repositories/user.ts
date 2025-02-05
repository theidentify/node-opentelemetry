import * as Schema from '../../schema';
import * as Errors from '../errors/user-errors';

type UserSchema = Schema.UserSchema.Schema;

export type UserRepository = {
  findMany: () => Promise<UserSchema[]>;
  findById: (
    id: Schema.Branded.UserId
  ) => Promise<UserSchema | Errors.FindUserError>;
};
