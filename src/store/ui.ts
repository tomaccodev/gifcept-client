import { action, computed, observable } from 'mobx';

import { IGif } from '../api/gifs';

export default class {
  @observable public viewdeGif?: IGif;

  @action
  public setViewedGif(viewedGif: IGif): void {
    this.viewdeGif = viewedGif;
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
