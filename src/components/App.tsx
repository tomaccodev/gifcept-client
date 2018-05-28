import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Store from '../store';
import Header from './header';

interface IAppProps {
  store: Store;
}

@inject('store')
@observer
export default class extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="App">
        <Header loggedIn={this.props.store.auth.isLoggedIn} />
      </div>
    );
  }
}
