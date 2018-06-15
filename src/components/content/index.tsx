import { observer } from 'mobx-react';
import * as React from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { IStoreComponentProps } from '../App';
import GifList from './componentes/GifList';

import scrollAware from '../../common/hocs/scrollAware';
import { GifSort } from '../../store/gifs';
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
        <Route exact={true} path={'/liked'} render={this.mostLiked} />
        <Route path={'/:id/gifs'} render={this.userGifs} />
      </main>
    );
  }

  private allGifs = () => {
    this.props.store!.gifs.setUser(undefined, GifSort.creation);
    return <GifList />;
  };

  private myGifs = () => {
    this.props.store!.gifs.setUser(this.props.store!.auth.userId, GifSort.creation);
    return <GifList />;
  };

  private mostLiked = () => {
    this.props.store!.gifs.setUser(undefined, GifSort.likes);
    return <GifList />;
  };

  private userGifs = (match: RouteComponentProps<any, StaticContext>) => {
    this.props.store!.gifs.setUser(match.match.params.id, GifSort.creation);
    return <GifList />;
  };
}

export default scrollAware<IStoreComponentProps>(withRouter(Container));
