import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Store from '../store';
import Content from './content';
import GifViewModal from './gifViewModal';
import Header from './header';

export interface IStoreComponentProps {
  store: Store;
}

@inject('store')
@observer
export default class extends React.Component<IStoreComponentProps> {
  public render() {
    const store = this.props.store;

    return (
      <div className="App">
        <Header
          loggedUser={store.auth.user}
          facebookLogin={store.auth.facebookLogin.bind(store.auth)}
          onSearch={store.gifs.setSearch.bind(store.gifs)}
        />
        <Content store={store} onBottomReached={store.gifs.getGifs.bind(store.gifs)} />
        <GifViewModal
          isOpen={store.ui.isViewingGif}
          gif={store.ui.viewdeGif}
          onLike={store.gifs.addLikeToGif.bind(store.gifs, store.ui.viewdeGif)}
          onClose={store.ui.unsetViewedGif.bind(store.ui)}
          loggedUser={store.auth.user}
        />
      </div>
    );
  }
}
