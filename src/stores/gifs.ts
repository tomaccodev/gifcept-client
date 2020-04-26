import { action, observable } from 'mobx';

import { getGifs, IGif } from '../api/gifs';
import { Rating } from '../common/constants';

const LOCALSTORAGE_KEY = 'gifs-filtering';

export default class {
  @observable
  public currentSearch?: string;

  @observable
  public currentRating = Rating.sfw;

  @observable
  public gifs: IGif[] = [];

  @observable
  public fetching = false;

  constructor() {
    this.currentSearch = undefined;
    this.currentRating = Rating.sfw;
    try {
      const rawData = localStorage.getItem(LOCALSTORAGE_KEY);
      if (rawData) {
        const data = JSON.parse(rawData);
        this.currentSearch = data.search;
        this.currentRating = data.rating;
      }
    } catch (err) {}
  }

  public getGifs = async () => {
    try {
      if (!this.fetching) {
        this.fetching = true;
        const gifs = await getGifs({
          before: this.gifs.length ? this.gifs[this.gifs.length - 1].id : undefined,
          matching: this.currentSearch,
          rating: this.currentRating,
        });
        this.addGifs(gifs);
        this.fetching = false;
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  private saveSearchToLocalstorage = () => {
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        search: this.currentSearch,
        rating: this.currentRating,
      }),
    );
  };

  @action
  public setCurrentSearch = (search: string) => {
    const trimmedSearch = search.trim();
    if (this.currentSearch !== trimmedSearch) {
      this.currentSearch = trimmedSearch === '' ? undefined : trimmedSearch;
      this.saveSearchToLocalstorage();
      this.gifs = [];
      this.getGifs();
    }
  };

  @action setCurrentRating = (rating: Rating) => {
    if (this.currentRating !== rating) {
      this.currentRating = rating;
      this.saveSearchToLocalstorage();
      this.gifs = [];
      this.getGifs();
    }
  };

  @action
  private addGifs(gifs: IGif[]) {
    for (const gif of gifs) {
      if (!this.gifs.find((g) => g.id === gif.id)) {
        this.gifs.push(gif);
      }
    }
  }
}
