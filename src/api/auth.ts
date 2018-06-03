import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const generateToken = (username: string, password: string) =>
  post('/api/auth/token', { username, password }).then((res: IPostTokenResponse) => {
    return res.token;
  });
