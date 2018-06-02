import { observer } from 'mobx-react';
import * as React from 'react';

import { IStoreComponentProps } from '../App';
import GifList from './componentes/GifList';

import './Content.css';

@observer
export default class extends React.Component<IStoreComponentProps> {
  public render() {
    const store = this.props.store;

    return (
      <main>
        <GifList gifs={store.gifs.gifs} setViewedGif={store.ui.setViewedGif.bind(store.ui)} />
      </main>
    );
  }
}
