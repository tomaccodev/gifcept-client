import * as React from 'react';

import { IGif } from '../../../api/gifs';
import GifListItem from './GifListItem';

interface IGifListProps {
  gifs: IGif[];
  setViewedGif: (gif: IGif) => void;
}

export default ({ gifs, setViewedGif }: IGifListProps) => (
  <div className="blocks-container">
    {gifs.map(g => {
      const onClick = () => setViewedGif(g);
      return <GifListItem onClick={onClick} key={g.id} gif={g} />;
    })}
  </div>
);
