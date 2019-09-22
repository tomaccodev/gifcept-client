import jwtDecode from 'jwt-decode';
import { action, computed, observable } from 'mobx';

import { facebookLogin, generateToken } from '../api/auth';
import { setToken } from '../api/common/init';
import { UserRole } from '../common/constants';

export interface ILoggedUser {
  username: string;
  id: string;
}

const LOCALSTORAGE_KEY = 'token';

export default class {
  // TODO: Handle token expiration and renovation
  @observable
  public token?: string;

  @observable
  public userId?: string;

  @observable
  public username?: string;

  @observable
  public role?: UserRole;

  constructor() {
    try {
      const token = localStorage.getItem(LOCALSTORAGE_KEY);

      if (token) {
        this.setToken(token);
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }

  public login = async (username: string, password: string) => {
    try {
      const token = await generateToken(username, password);

      this.setToken(token);
      return true;
    } catch (err) {
      return false;
    }
  };

  public facebookLogin = async () => {
    try {
      const token = await facebookLogin();
      this.setToken(token);
      return true;
    } catch (err) {
      return false;
    }
  };

  @action
  private setToken(token: string) {
    const { userId, username, role } = jwtDecode(token);
    setToken(token);

    this.role = role as UserRole;
    this.token = token;
    this.userId = userId;
    this.username = username;
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  @computed
  get user() {
    return this.token ? ({ username: this.username, id: this.userId } as ILoggedUser) : undefined;
  }
}
