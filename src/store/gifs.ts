import { action, observable, runInAction } from 'mobx';

import { getGifs, IGif } from '../api/gifs';

export default class {
  @observable public gifs: IGif[] = [];

  @action
  public async getGifs(): Promise<void> {
    try {
      const gifs = await getGifs();
      runInAction(() => {
        this.gifs = gifs;
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }
}
