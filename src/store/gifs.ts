import { action, observable, runInAction } from 'mobx';

import { getGifComments, getGifs, IGif } from '../api/gifs';

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

  @action
  public async getGifComments(gif: IGif): Promise<void> {
    try {
      const comments = await getGifComments(gif.id);
      runInAction(() => {
        gif.comments = comments;
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }
}
