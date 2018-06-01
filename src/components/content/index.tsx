import { observer } from 'mobx-react';
import * as React from 'react';

import { IStoreComponentProps } from '../App';
import GifList from './componentes/GifList';

import './Content.css';

@observer
export default class extends React.Component<IStoreComponentProps> {
  public render() {
    return (
      <main>
        <GifList gifs={this.props.store.gifs.gifs || []} />
      </main>
    );
  }
}
