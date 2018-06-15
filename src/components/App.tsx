import { inject, observer, Provider } from 'mobx-react';
import * as React from 'react';
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
      </Provider>
    );
  }
}

export default withRouter(App);
