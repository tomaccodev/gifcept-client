import { inject, observer, Provider } from 'mobx-react';
import React from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Store from '../store';
import Content from './content';
import GifViewModal from './gifViewModal';
import Header from './header';

export interface IStoreComponentProps {
  store?: Store;
}

@inject('store')
@observer
class App extends React.Component<IStoreComponentProps & RouteComponentProps<any, StaticContext>> {
  public render() {
    const store = this.props.store!;

    return (
      <Provider store={store}>
        <div className="App">
          <Header
            loggedUser={store.auth.user}
            facebookLogin={store.auth.facebookLogin}
            onSearch={this.doSearch}
          />
          <Content store={store} onBottomReached={store.gifs.getGifs} />
          <GifViewModal
            isOpen={store.ui.isViewingGif}
            gif={store.ui.viewdeGif}
            onLike={this.likeViewedGif}
            onClose={this.closeViewedGif}
            loggedUser={store.auth.user}
          />
        </div>
      </Provider>
    );
  }

  private likeViewedGif = () => {
    const store = this.props.store!;

    if (store.ui.viewdeGif) {
      store.gifs.addLikeToGif(store.ui.viewdeGif!);
    }
  };

  private closeViewedGif = () => {
    const store = this.props.store!;

    store.ui.unsetViewedGif();
  };

  private doSearch = (search: string) => {
    const store = this.props.store!;

    store.gifs.setSearchCriteria({ search });
  };
}

export default withRouter(App);
