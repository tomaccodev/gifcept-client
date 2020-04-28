import { action, computed, observable } from 'mobx';

import { addGifByUrl, getGifs, IGif } from '../api/gifs';
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
    } catch (err) {
      // Do nothing
    }
  }

  @computed
  private get search() {
    return this.currentSearch && this.currentSearch.trim() !== ''
      ? this.currentSearch.trim()
      : undefined;
  }

  @action
  public getGifs = async () => {
    try {
      if (!this.fetching) {
        this.fetching = true;
        const gifs = await getGifs({
          before: this.gifs.length ? this.gifs[this.gifs.length - 1].id : undefined,
          matching: this.search,
          rating: this.currentRating,
        });
        this.addGifsToCurrentCollection(gifs);
        this.fetching = false;
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  @action
  public addGifByUrl = async (url: string) => {
    try {
      const gif = await addGifByUrl(url);
      this.addGifsToCurrentCollection([gif]);
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
    if (this.currentSearch !== search) {
      this.currentSearch = search === '' ? undefined : search;
      this.saveSearchToLocalstorage();
      this.gifs = [];
      this.getGifs();
    }
  };

  @action
  setCurrentRating = (rating: Rating) => {
    if (this.currentRating !== rating) {
      this.currentRating = rating;
      this.saveSearchToLocalstorage();
      this.gifs = [];
      this.getGifs();
    }
  };

  @action
  private addGifsToCurrentCollection(gifs: IGif[]) {
    for (const gif of gifs) {
      if (!this.gifs.find((g) => g.id === gif.id)) {
        const position = this.gifs.findIndex((g) => gif.created > g.created);
        this.gifs.splice(position === -1 ? this.gifs.length : position, 0, gif);
      }
    }
  }
}
