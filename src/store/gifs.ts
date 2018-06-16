import { action, observable, runInAction } from 'mobx';

import { addLikeToGif, getGifComments, getGifs, IGetGifsOptions, IGif } from '../api/gifs';

export enum GifSort {
  creation = 'created',
  popularity = 'popularity',
}

interface ISearchCriteria {
  search?: string;
  user?: string | null;
  sort?: GifSort;
}

export default class {
  @observable public gifs: IGif[] = [];

  @observable private search: string = '';

  @observable private user: string | null = null;

  @observable private sort: GifSort = GifSort.creation;

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
  public setSearchCriteria({
    sort = this.sort,
    search = this.search,
    user = this.user,
  }: ISearchCriteria) {
    if (this.sort !== sort && this.search !== search && this.user) {
      return;
    }
    this.sort = sort;
    this.search = search;
    this.user = user;
    this.reset();
  }

  @action
  private reset() {
    this.gifs = [];
    this.getGifs();
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
