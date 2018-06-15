import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { IStoreComponentProps } from '../../App';
import GifListItem from './GifListItem';

@inject('store')
@observer
export default class extends React.Component<IStoreComponentProps> {
  public render() {
    const store = this.props.store!;

    return (
      <div className="blocks-container">
        {store.gifs.gifs.map(g => {
          const onClick = () => store.ui.setViewedGif.bind(store.ui)(g);
          return <GifListItem onClick={onClick} key={g.id} gif={g} />;
        })}
      </div>
    );
  }
}
