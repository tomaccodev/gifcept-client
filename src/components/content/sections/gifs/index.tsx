import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IGif } from '../../../../api/gifs';
import useScrollPosition from '../../../../hooks/useScrollPosition';
import useStores from '../../../../hooks/useStores';
import Gif from '../../common/gif';
import styles from '../../Content.module.scss';

import Header, { HeaderType } from './components/header';

export enum GifMode {
  all = 'all',
  byUser = 'byUser',
  byTag = 'byTag',
}

interface IGifsProps {
  mode: GifMode;
  onSetSelectedGif: (gif: IGif) => void;
}

const preloadMargin = 300;

export default observer(({ mode, onSetSelectedGif }: IGifsProps) => {
  const { gifs } = useStores();
  const scrollPosition = useScrollPosition();

  const { username, tag } = useParams();

  useEffect(() => {
    switch (mode) {
      case GifMode.byTag:
        gifs.setCurrentUsername(undefined);
        gifs.setCurrentTag(tag);
        break;
      case GifMode.byUser:
        gifs.setCurrentTag(undefined);
        gifs.setCurrentUsername(username);
        break;
      case GifMode.all:
        gifs.setCurrentUsername(undefined);
        gifs.setCurrentTag(undefined);
        break;
    }
  }, [mode, gifs, username, tag]);

  useEffect(() => {
    if (gifs.gifs.length === 0 || scrollPosition.bottom < preloadMargin) {
      gifs.getGifs();
    }
  }, [scrollPosition, gifs.gifs, gifs]);

  let header;
  switch (mode) {
    case GifMode.byTag:
      header = <Header type={HeaderType.tag} text={tag!} />;
      break;
    case GifMode.byUser:
      header = <Header type={HeaderType.user} text={username!} />;
      break;
  }

  return (
    <div className={styles['blocks-container']}>
      {header}
      {gifs.gifs.map((g) => (
        <Gif key={g.id} gif={g} onClick={() => onSetSelectedGif(g)} />
      ))}
    </div>
  );
});
