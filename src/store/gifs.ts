import { action, observable, runInAction } from 'mobx';

import { addLikeToGif, getGifComments, getGifs, IGetGifsOptions, IGif } from '../api/gifs';

export enum GifSort {
  creation = 'created',
  likes = 'likes',
}

export default class {
  @observable public gifs: IGif[] = [];

  @observable private search?: string;

  @observable private user?: string;

  @observable private sort: GifSort = GifSort.creation;

  @action
  public reset() {
    this.gifs = [];
    this.getGifs();
  }

  public async getGifs(): Promise<void> {
    try {
      const options: IGetGifsOptions = {
        search: this.search,
        sort: this.sort,
        user: this.user,
      };

      if (this.gifs.length) {
        options.before = this.gifs[this.gifs.length - 1].created.toISOString();
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
  public setSort(sort: GifSort) {
    if (sort === this.sort) {
      return;
    }
    this.sort = sort;
    this.reset();
  }

  @action
  public setSearch(search?: string, sort?: GifSort) {
    if (search === this.search && sort === this.sort) {
      return;
    }

    this.search = search;
    if (sort) {
      this.sort = sort;
    }
    this.reset();
  }

  @action
  public setUser(user?: string, sort?: GifSort) {
    if (user === this.user && sort === this.sort) {
      return;
    }

    this.user = user;
    if (sort) {
      this.sort = sort;
    }
    this.reset();
  }

  @action
  private addGifs(gifs: IGif[]) {
    for (const gif of gifs) {
      if (!this.gifs.find(g => g.id === gif.id)) {
        this.gifs.push(gif);
      }
    }
  }
}
