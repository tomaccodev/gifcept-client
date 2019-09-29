import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { IStoreComponentProps } from '../App';
import AllGifs from './sections/AllGifs';
import MyGifs from './sections/MyGifs';
import TrendyGifs from './sections/TrendyGifs';

import scrollAware from '../../common/hocs/scrollAware';

import './Content.css';
import UserGifs from './sections/UserGifs';

@observer
class Container extends Component<IStoreComponentProps & RouteComponentProps<any, StaticContext>> {
  public render() {
    return (
      <main>
        <Route exact={true} path={'/'} component={AllGifs} />
        <Route exact={true} path={'/myGifs'} component={MyGifs} />
        <Route exact={true} path={'/trendy'} component={TrendyGifs} />
        <Route path={'/:id/gifs'} component={UserGifs} />
      </main>
    );
  }
}

export default scrollAware<IStoreComponentProps>(withRouter(Container));
