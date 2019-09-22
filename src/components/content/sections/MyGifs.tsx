import { inject } from 'mobx-react';
import React from 'react';

import { GifOrder } from '../../../common/constants';
import { IStoreComponentProps } from '../../App';
import GifList from '../componentes/GifList';

@inject('store')
export default class extends React.Component<IStoreComponentProps> {
  public componentDidMount() {
    this.props.store!.gifs.setSearchCriteria({
      sort: GifOrder.creation,
      user: this.props.store!.auth.userId,
    });
  }

  public render() {
    return <GifList />;
  }
}
