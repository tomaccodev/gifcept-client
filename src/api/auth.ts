import { post } from './common/methods';

interface IPostTokenResponse {
  token: string;
}

export const generateToken = (username: string, password: string) =>
  post('/api/auth/token', { username, password }).then((res: IPostTokenResponse) => res.token);

const generateFacebookBasedToken = (token: string) => {
  return post('/api/auth/facebook', { access_token: token }).then(
    (res: IPostTokenResponse) => res.token,
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
