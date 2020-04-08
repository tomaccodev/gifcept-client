import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const generateToken = (email: string, password: string) =>
  post<IPostTokenResponse>('/api/auth/token', { email, password }).then((res) => res.token);
