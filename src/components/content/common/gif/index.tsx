import { runInAction } from 'mobx';
import { observer, useLocalStore } from 'mobx-react';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IGif } from '../../../../api/gifs';
import { copy } from '../../../../utils/clipboard';
import imagePreloader from '../../../../utils/imagePreloader';

import styles from './Gif.module.scss';

interface IGifProps {
  gif: IGif;
  onClick: () => void;
}

const gifStore = (gif: IGif) => ({
  hovered: false,
  imageUrl: gif.frameUrlPath,
  async playGif() {
    runInAction(() => {
      this.hovered = true;
    });
    await imagePreloader(gif.animationUrlPath);
    runInAction(() => {
      if (this.hovered) {
        this.imageUrl = gif.animationUrlPath;
      }
    });
  },
  async pauseGif() {
    runInAction(() => {
      this.hovered = false;
    });
    await imagePreloader(gif.frameUrlPath);
    runInAction(() => {
      if (!this.hovered) {
        this.imageUrl = gif.frameUrlPath;
      }
    });
  },
});

export default observer(({ gif, onClick }: IGifProps) => {
  const store = useLocalStore(gifStore, gif);
  const copyGifUrl = useCallback(() => copy(`${window.location.origin}${gif.animationUrlPath}`), [
    gif,
  ]);

  return (
    <div
      className={styles['block-item-wrapper']}
      onMouseEnter={store.playGif}
      onMouseLeave={store.pauseGif}
    >
      <div className={styles['block-item-top']}>
        <span className={styles['block-item-name']} title={gif.description}>
          {gif.description}
        </span>
        <i className="material-icons" onClick={copyGifUrl} title="Copy to clipboard">
          assignment
        </i>
      </div>
      <button
        className={styles['block-item-gif-container']}
        style={{ backgroundImage: `url(${store.imageUrl})`, backgroundColor: gif.color }}
        onClick={onClick}
      />
      <div>
        <ul className={styles['block-item-main-actions']}>
          <li>
            <i className="material-icons">favorite_border</i>
            <span>{gif.likesCount}</span>
          </li>
          <li>
            <i className="material-icons">forum</i>
            <span>{gif.commentsCount}</span>
          </li>
          <li>
            <i className="material-icons">reply_all</i>
            <span>{gif.sharesCount}</span>
          </li>
          <li>
            <i className="material-icons">visibility</i>
            <span>{gif.viewsCount}</span>
          </li>
        </ul>
        <Link className={styles['block-item-uploader']} to={`/${gif.userId}/gifs`}>
          <img
            src="https://via.placeholder.com/24x24"
            className="block-item-uploader-avatar"
            alt={gif.userName}
          />
          <span>{gif.userName}</span>
        </Link>
      </div>
    </div>
  );
});
