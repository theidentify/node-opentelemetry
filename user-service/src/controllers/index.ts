import * as Healths from './health';
export * as Healths from './health';
import * as Users from './users';
export * as Users from './users';

export const apiDocs = Healths.docs.concat(Users.docs);
