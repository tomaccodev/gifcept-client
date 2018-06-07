import { observer } from 'mobx-react';
import * as React from 'react';

import { IGif } from '../../../api/gifs';
import GifListItem from './GifListItem';

interface IGifListProps {
  gifs: IGif[];
  setViewedGif: (gif: IGif) => void;
}

@observer
export default class extends React.Component<IGifListProps> {
  public render() {
    const { gifs, setViewedGif } = this.props;

    return (
      <div className="blocks-container">
        {gifs.map(g => {
          const onClick = () => setViewedGif(g);
          return <GifListItem onClick={onClick} key={g.id} gif={g} />;
        })}
      </div>
    );
  }
}
