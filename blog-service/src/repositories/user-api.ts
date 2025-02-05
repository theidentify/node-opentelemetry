import { Branded } from '../schema';
import { UserApiClient } from '../types/repositories/user-api';

const USER_BASEURL = 'http://localhost:3000/users';

const userApi: UserApiClient = {
  findById: async (id: Branded.UserId) => {
    return fetch(`${USER_BASEURL}/${id}`).then((res) => res.json());
  },
  findMany: async () => {
    return fetch(`${USER_BASEURL}`).then((res) => res.json());
  },
};

export default userApi;
