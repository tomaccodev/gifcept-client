import { action, computed, observable } from 'mobx';

import { IGif } from '../api/gifs';
import RootStore from './';

export default class {
  @observable public viewdeGif?: IGif;

  constructor(private rootStore: RootStore) {}

  @action
  public setViewedGif(viewedGif: IGif): void {
    this.viewdeGif = viewedGif;
    this.rootStore.gifs.getGifComments(viewedGif);
  }

  @action
  public unsetViewedGif(): void {
    this.viewdeGif = undefined;
  }

  @computed
  public get isViewingGif(): boolean {
    return !!this.viewdeGif;
  }
}
