import * as jwtDecode from 'jwt-decode';

import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const postToken = (username: string, password: string) =>
  post('/api/auth/token', { username, password }).then((res: IPostTokenResponse) => {
    const { userId, username: tokenUsername, role } = jwtDecode(res.token);

    return {
      role,
      token: res.token,
      userId,
      username: tokenUsername,
    };
  });
