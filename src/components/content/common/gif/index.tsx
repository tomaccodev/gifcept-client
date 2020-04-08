import { runInAction } from 'mobx';
import { observer, useLocalStore } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { IGif } from '../../../../api/gifs';
import { copy } from '../../../../utils/clipboard';
import imagePreloader from '../../../../utils/imagePreloader';

import './Gif.css';

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

  return (
    <div className="block-item-wrapper" onMouseEnter={store.playGif} onMouseLeave={store.pauseGif}>
      <div className="block-item-top">
        <span className="block-item-name" title={gif.description}>
          {gif.description}
        </span>
        <i
          className="material-icons"
          onClick={() => copy(`${window.location.host}${gif.animationUrlPath}`)}
        >
          
        </i>
      </div>
      <button
        className="block-item-gif-container"
        style={{ backgroundImage: `url(${store.imageUrl})`, backgroundColor: gif.color }}
        onClick={onClick}
      />
      <div className="block-item-bottom">
        <ul className="block-item-main-actions">
          <li className="block-item-like">
            <i className="material-icons"></i>
            <span className="block-item-like-counter">{gif.likesCount}</span>
          </li>
          <li className="block-item-comment">
            <i className="material-icons"></i>
            <span className="block-item-comment-counter">{gif.commentsCount}</span>
          </li>
          <li className="block-item-recept">
            <i className="material-icons"></i>
            <span className="block-item-recept-counter">{gif.sharesCount}</span>
          </li>
          <li className="block-item-views">
            <i className="material-icons"></i>
            <span className="block-item-views-counter">{gif.viewsCount}</span>
          </li>
        </ul>
        <Link className="block-item-uploader" to={`/${gif.userId}/gifs`}>
          <img
            src="https://via.placeholder.com/24x24"
            className="block-item-uploader-avatar"
            alt="Periquito de los Palotes"
          />
          <span className="block-item-uploader-name">{gif.userName}</span>
        </Link>
      </div>
    </div>
  );
});
