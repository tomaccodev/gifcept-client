import { action, observable, runInAction } from 'mobx';

import { addLikeToGif, getGifComments, getGifs, IGetGifsOptions, IGif } from '../api/gifs';

export default class {
  @observable public gifs: IGif[] = [];

  @observable private search: string = '';

  public async getGifs(): Promise<void> {
    try {
      const options: IGetGifsOptions = {};

      if (this.gifs.length) {
        options.before = this.gifs[this.gifs.length - 1].created.toISOString();
      }
      if (this.search) {
        options.search = this.search;
      }
      const gifs = await getGifs(options);
      this.addGifs(gifs);
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

  @action
  public setSearch(search: string) {
    this.gifs = [];
    this.search = search;
    this.getGifs();
  }

  @action
  private addGifs(gifs: IGif[]) {
    for (const gif of gifs) {
      if (!this.gifs.find(g => g.id === gif.id)) {
        this.gifs.push(gif);
      }
    }

    this.gifs = this.gifs.slice().sort((g1, g2) => g2.created.getTime() - g1.created.getTime());
  }
}
