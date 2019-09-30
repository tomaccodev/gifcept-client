import { action, observable, runInAction } from 'mobx';

import {
  addLikeToGif,
  getGifComments,
  getGifs,
  getUserGifs,
  IGetGifsOptions,
  IGif,
} from '../api/gifs';
import { GifOrder, Rating } from '../common/constants';

interface ISearchCriteria {
  search?: string;
  user?: string;
  sort?: GifOrder;
  ratings?: Rating[];
}

export default class {
  @observable
  public gifs: IGif[] = [];

  @observable
  private search?: string = '';

  @observable
  private user?: string;

  @observable
  private ratings: Rating[] = [Rating.sfw];

  @observable
  private order: GifOrder = GifOrder.creation;

  public getGifs = async () => {
    try {
      const options: IGetGifsOptions = {
        order: this.order,
        search: this.search,
        ratings: this.ratings,
      };

      if (this.gifs.length) {
        options.before = this.gifs[this.gifs.length - 1].id;
      }
      const gifs = await (this.user ? getUserGifs(this.user, options) : getGifs(options));
      this.addGifs(gifs);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  public getGifComments = async (gif: IGif) => {
    try {
      const comments = await getGifComments(gif.shortId);
      runInAction(() => {
        gif.comments = comments;
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  public addLikeToGif = async (gif: IGif) => {
    try {
      await addLikeToGif(gif.id);
      runInAction(() => {
        gif.likesCount += 1;
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  @action
  public setSearchCriteria(searchCriteria: ISearchCriteria) {
    if (
      this.order === searchCriteria.sort &&
      this.search === searchCriteria.search &&
      this.user === searchCriteria.user
    ) {
      return;
    }
    if (searchCriteria.hasOwnProperty('sort')) {
      this.order = searchCriteria.sort || GifOrder.creation;
    }
    if (searchCriteria.hasOwnProperty('search')) {
      this.search = searchCriteria.search;
    }
    if (searchCriteria.hasOwnProperty('user')) {
      this.user = searchCriteria.user;
    }
    if (searchCriteria.hasOwnProperty('ratings')) {
      this.ratings = searchCriteria.ratings || [Rating.sfw];
    }
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
