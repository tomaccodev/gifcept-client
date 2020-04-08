import { observer } from 'mobx-react';
import React from 'react';

import { IGif } from '../../../../api/gifs';
import useScrollPosition from '../../../../hooks/useScrollPosition';
import useStores from '../../../../hooks/useStores';
import Gif from '../../common/gif';

interface IGifsProps {
  mode: string;
  onSetSelectedGif: (gif: IGif) => void;
}

export default observer(({ mode, onSetSelectedGif }: IGifsProps) => {
  const { gifs } = useStores();
  const scrollPosition = useScrollPosition();

  if (gifs.gifs.length === 0) {
    gifs.getGifs();
  }

  return (
    <div className="blocks-container">
      {gifs.gifs.map((g) => (
        <Gif key={g.id} gif={g} onClick={() => onSetSelectedGif(g)} />
      ))}
    </div>
  );
});
