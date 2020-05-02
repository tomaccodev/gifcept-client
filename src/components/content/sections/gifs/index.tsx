import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { IGif } from '../../../../api/gifs';
import useScrollPosition from '../../../../hooks/useScrollPosition';
import useStores from '../../../../hooks/useStores';
import Gif from '../../common/gif';
import styles from '../../Content.module.scss';

interface IGifsProps {
  mode: string;
  onSetSelectedGif: (gif: IGif) => void;
}

const preloadMargin = 300;

export default observer(({ mode, onSetSelectedGif }: IGifsProps) => {
  const { gifs } = useStores();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (gifs.gifs.length === 0 || scrollPosition.bottom < preloadMargin) {
      gifs.getGifs();
    }
  }, [scrollPosition, gifs.gifs, gifs]);

  return (
    <div className={styles['blocks-container']}>
      {gifs.gifs.map((g) => (
        <Gif key={g.id} gif={g} onClick={() => onSetSelectedGif(g)} />
      ))}
    </div>
  );
});
