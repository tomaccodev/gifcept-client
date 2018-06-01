import { action, computed, observable, runInAction } from 'mobx';

import { generateToken } from '../api/auth';
import { UserRole } from '../common/constants';

export interface ILoggedUser {
  username: string;
}

export default class {
  // TODO: Handle token expiration and renovation
  @observable public token: string;

  @observable public userId: string;

  @observable public username: string;

  @observable public role: UserRole;

  @action
  public async login(username: string, password: string) {
    try {
      const res = await generateToken(username, password);

      runInAction(() => {
        this.role = res.role as UserRole;
        this.token = res.token;
        this.userId = res.userId;
        this.username = res.username;
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  @computed
  get user(): ILoggedUser | null {
    return this.token ? { username: this.username } : null;
  }
}
