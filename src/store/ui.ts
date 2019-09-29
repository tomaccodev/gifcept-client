import { action, computed, observable } from 'mobx';

import { IGif } from '../api/gifs';
import RootStore from './';

export default class {
  @observable
  public viewdeGif?: IGif;

  @observable
  public loginModalVisible: boolean = false;

  constructor(private rootStore: RootStore) {}

  @action
  public setViewedGif(viewedGif: IGif) {
    this.viewdeGif = viewedGif;
    this.rootStore.gifs.getGifComments(viewedGif);
  }

  @action
  public unsetViewedGif() {
    this.viewdeGif = undefined;
  }

  @action
  public setLoginModalVisible(loginModalVisible: boolean) {
    this.loginModalVisible = loginModalVisible;
  }

  @computed
  public get isViewingGif() {
    return !!this.viewdeGif;
  }
}
