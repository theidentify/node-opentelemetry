import * as Schema from '../../schema';
import * as Errors from '../errors/user-errors';

type UserSchema = Schema.UserSchema.Schema;

export type UserApiClient = {
  findMany: () => Promise<{ success: boolean; data: UserSchema[] }>;
  findById: (
    id: Schema.Branded.UserId
  ) => Promise<{ success: boolean; data: UserSchema | Errors.FindUserError }>;
};
