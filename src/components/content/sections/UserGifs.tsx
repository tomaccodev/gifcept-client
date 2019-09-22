import { inject } from 'mobx-react';
import React from 'react';

import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { GifOrder } from '../../../common/constants';
import { IStoreComponentProps } from '../../App';
import GifList from '../componentes/GifList';

@inject('store')
export default class extends React.Component<
  IStoreComponentProps & RouteComponentProps<any, StaticContext>
> {
  public componentDidMount() {
    this.props.store!.gifs.setSearchCriteria({
      sort: GifOrder.creation,
      user: this.props.match.params.id,
    });
  }

  public render() {
    return <GifList />;
  }
}
