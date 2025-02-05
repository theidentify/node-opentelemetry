import * as Healths from './health';
export * as Healths from './health';
import * as Blogs from './blogs';
export * as Blogs from './blogs';

export const apiDocs = Healths.docs.concat(Blogs.docs);
