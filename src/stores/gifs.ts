import { action, computed, observable } from 'mobx';

import {
  addGifByFile,
  addGifByUrl,
  addLike,
  deleteGif,
  getGifs,
  getTagGifs,
  getUserGifs,
  IGetTagGifsOptions,
  IGetUserGifsOptions,
  IGif,
  IGifPatch,
  removeLike,
  updateGif,
} from '../api/gifs';
import { Rating } from '../common/constants';

import AuthStore from './auth';

const LOCALSTORAGE_KEY = 'gifs-filtering';

export default class {
  @observable
  public currentSearch?: string;

  @observable
  public currentRating = Rating.sfw;

  @observable
  public currentUsername?: string;

  @observable
  public currentTag?: string;

  @observable
  public gifs: IGif[] = [];

  @observable
  public fetching = false;

  constructor(private authStore: AuthStore) {
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
        const options = {
          before: this.gifs.length ? this.gifs[this.gifs.length - 1].id : undefined,
          matching: this.search,
          rating: this.currentRating,
          username: this.currentUsername,
          tag: this.currentTag,
        };
        let gifsPromise;
        if (options.username) {
          gifsPromise = getUserGifs(options as IGetUserGifsOptions);
        } else if (options.tag) {
          gifsPromise = getTagGifs(options as IGetTagGifsOptions);
        } else {
          gifsPromise = getGifs(options);
        }
        const gifs = await gifsPromise;
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
    if (this.authStore.user) {
      try {
        const gif = await addGifByUrl(url);
        this.addGifsToCurrentCollection([gif]);
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
      }
    }
  };

  @action addGifByFile = async (file: File) => {
    if (this.authStore.user) {
      try {
        const gif = await addGifByFile(file);
        this.addGifsToCurrentCollection([gif]);
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
      }
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

  private reloadGifs = () => {
    this.gifs = [];
    this.getGifs();
  };

  @action
  public setCurrentSearch = (search: string) => {
    if (this.currentSearch !== search) {
      this.currentSearch = search === '' ? undefined : search;
      this.saveSearchToLocalstorage();
      this.reloadGifs();
    }
  };

  @action
  setCurrentRating = (rating: Rating) => {
    if (this.currentRating !== rating) {
      this.currentRating = rating;
      this.saveSearchToLocalstorage();
      this.reloadGifs();
    }
  };

  @action
  setCurrentUsername = (username?: string) => {
    if (this.currentUsername !== username) {
      this.currentUsername = username;
      this.reloadGifs();
    }
  };

  @action
  setCurrentTag = (tag?: string) => {
    if (this.currentTag !== tag) {
      this.currentTag = tag;
      this.reloadGifs();
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

  private getById = (id: string) => this.gifs.find((g) => g.id === id);

  @action
  public updateGif = async (gif: IGif, updatedInfo: IGifPatch) => {
    if (this.authStore.user) {
      const updatedGif = await updateGif(gif, updatedInfo);
      Object.assign(gif, updatedGif);
    }
  };

  @action
  public deleteGif = async (gif: IGif) => {
    if (this.authStore.user) {
      const position = this.gifs.findIndex((g) => gif.id === g.id);
      deleteGif(gif);
      this.gifs.splice(position === -1 ? this.gifs.length : position, 1);
    }
  };

  @action
  public likeGif = async (gif: IGif) => {
    if (this.authStore.user) {
      const localGif = this.getById(gif.id);
      if (localGif !== undefined) {
        localGif.likes.push(await addLike(localGif));
        localGif.likesCount++;
      }
    }
  };

  @action
  public unlikeGif = async (gif: IGif) => {
    if (this.authStore.user) {
      const localGif = this.getById(gif.id);
      if (localGif !== undefined) {
        await removeLike(localGif);
        localGif.likes = localGif.likes.filter((l) => l.user.id !== this.authStore.user!.id);
        localGif.likesCount--;
      }
    }
  };
}
