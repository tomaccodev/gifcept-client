import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const generateToken = (usernameOrEmail: string, password: string) =>
  post<IPostTokenResponse>('/api/auth/token', { usernameOrEmail, password }).then(
    (res) => res.token,
  );
