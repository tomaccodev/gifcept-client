import { observer } from 'mobx-react';
import * as React from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { IStoreComponentProps } from '../App';
import GifList from './componentes/GifList';

import { GifOrder } from '../../common/constants';
import scrollAware from '../../common/hocs/scrollAware';

import './Content.css';

@observer
class Container extends React.Component<
  IStoreComponentProps & RouteComponentProps<any, StaticContext>
> {
  public render() {
    return (
      <main>
        <Route exact={true} path={'/'} render={this.allGifs} />
        <Route exact={true} path={'/myGifs'} render={this.myGifs} />
        <Route exact={true} path={'/trendy'} render={this.trendy} />
        <Route path={'/:id/gifs'} render={this.userGifs} />
      </main>
    );
  }

  private allGifs = () => {
    this.props.store!.gifs.setSearchCriteria({ user: undefined, sort: GifOrder.creation });
    return <GifList />;
  };

  private myGifs = () => {
    this.props.store!.gifs.setSearchCriteria({
      sort: GifOrder.creation,
      user: this.props.store!.auth.userId,
    });
    return <GifList />;
  };

  private trendy = () => {
    this.props.store!.gifs.setSearchCriteria({ user: undefined, sort: GifOrder.popularity });
    return <GifList />;
  };

  private userGifs = (match: RouteComponentProps<any, StaticContext>) => {
    this.props.store!.gifs.setSearchCriteria({
      sort: GifOrder.creation,
      user: match.match.params.id,
    });
    return <GifList />;
  };
}

export default scrollAware<IStoreComponentProps>(withRouter(Container));
