import { observable, runInAction } from 'mobx';

import { addLikeToGif, getGifComments, getGifs, IGif } from '../api/gifs';

export default class {
  @observable public gifs: IGif[] = [];

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

  public async addLikeToGif(gif: IGif): Promise<void> {
    try {
      await addLikeToGif(gif.id);
      runInAction(() => {
        gif.likesCount += 1;
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }
}
