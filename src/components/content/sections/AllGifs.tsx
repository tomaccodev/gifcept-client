import { inject } from 'mobx-react';
import * as React from 'react';

import { GifOrder } from '../../../common/constants';
import { IStoreComponentProps } from '../../App';
import GifList from '../componentes/GifList';

@inject('store')
export default class extends React.Component<IStoreComponentProps> {
  public componentDidMount() {
    this.props.store!.gifs.setSearchCriteria({ user: undefined, sort: GifOrder.creation });
  }

  public render() {
    return <GifList />;
  }
}
