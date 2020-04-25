import { action, observable } from 'mobx';

import { getGifs, IGif } from '../api/gifs';

export default class {
  @observable
  public currentSearch?: string;

  @observable
  public gifs: IGif[] = [];

  @observable
  public fetching = false;

  public getGifs = async () => {
    try {
      if (!this.fetching) {
        this.fetching = true;
        const gifs = await getGifs({
          before: this.gifs.length ? this.gifs[this.gifs.length - 1].id : undefined,
          matching: this.currentSearch,
        });
        this.addGifs(gifs);
        this.fetching = false;
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  @action
  public setCurrentSearch = (search: string) => {
    const trimmedSearch = search.trim();
    this.currentSearch = trimmedSearch === '' ? undefined : trimmedSearch;
    this.gifs = [];
    this.getGifs();
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
