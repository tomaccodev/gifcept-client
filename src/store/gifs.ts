import { action, observable } from 'mobx';

import { getGifs, IGif } from '../api/gifs';

export default class {
  @observable public gifs: IGif[];

  @action
  public async getGifs() {
    try {
      this.gifs = await getGifs();
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  }
}
