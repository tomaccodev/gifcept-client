import jwtDecode from 'jwt-decode';
import { action, computed, observable } from 'mobx';

import { generateToken } from '../api/auth';
import { setToken } from '../api/common/init';
import { UserRole } from '../common/constants';
import Emitter, { Event } from '../events';

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
      Emitter.on(Event.logout, () => {
        this.setToken();
      });
      // TODO: Handle persistence level
      const token = localStorage.getItem(LOCALSTORAGE_KEY);

      if (token) {
        this.setToken(token);
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }

  public login = async (usernameOrEmail: string, password: string) => {
    try {
      const token = await generateToken(usernameOrEmail, password);

      this.setToken(token);
      return true;
    } catch (err) {
      return false;
    }
  };

  @action
  private setToken = (token?: string) => {
    setToken(token);
    if (token) {
      const { id, username, role } = jwtDecode(token);

      this.role = role as UserRole;
      this.token = token;
      this.userId = id;
      this.username = username;
      localStorage.setItem(LOCALSTORAGE_KEY, token);
    } else {
      this.role = undefined;
      this.token = undefined;
      this.userId = undefined;
      this.username = undefined;
      localStorage.removeItem(LOCALSTORAGE_KEY);
    }
  };

  @computed
  get user() {
    return this.token ? ({ username: this.username, id: this.userId } as ILoggedUser) : undefined;
  }
}
