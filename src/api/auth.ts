import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const generateToken: (username: string, password: string) => Promise<string> = (
  username,
  password,
) => post<IPostTokenResponse>('/api/auth/token', { username, password }).then(res => res.token);

const generateFacebookBasedToken: (token: string) => Promise<string> = token => {
  return post<IPostTokenResponse>('/api/auth/facebook', { access_token: token }).then(
    res => res.token,
  );
};

export const facebookLogin: () => Promise<string> = () =>
  new Promise((res, rej) => {
    FB.login(
      loginRes => {
        if (!loginRes.authResponse) {
          return rej();
        }
        if (loginRes.authResponse.grantedScopes.split(',').indexOf('email') === -1) {
          // TODO: Show error message stating that email is mandatory
          return FB.logout(rej);
        }
        return res(generateFacebookBasedToken(loginRes.authResponse.accessToken));
      },
      { scope: 'email', return_scopes: true, auth_type: 'rerequest' },
    );
  });
