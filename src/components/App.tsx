import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Store from '../store';
import Content from './content';
import Header from './header';

export interface IStoreComponentProps {
  store: Store;
}

@inject('store')
@observer
export default class extends React.Component<IStoreComponentProps> {
  public render() {
    return (
      <div className="App">
        <Header loggedUser={this.props.store.auth.user} />
        <Content store={this.props.store} />
      </div>
    );
  }
}
