import * as React from 'react';

import { IGif } from '../../../api/gifs';

import './GifListItem.css';

interface IGifListItemProps {
  gif: IGif;
}

export default ({ gif }: IGifListItemProps) => (
  <div className="block-item-wrapper">
    <div className="block-item-top">
      <span className="block-item-name" title={gif.description}>
        {gif.description}
      </span>
      <i className="material-icons"></i>
    </div>
    <a
      className="block-item-gif-container"
      style={{ backgroundImage: 'url(http://via.placeholder.com/247x247)' }}
    />
    <div className="block-item-bottom">
      <ul className="block-item-main-actions">
        <li className="block-item-like">
          <i className="material-icons"></i>
          <span className="block-item-like-counter">{gif.likesCount || 0}</span>
        </li>
        <li className="block-item-comment">
          <i className="material-icons"></i>
          <span className="block-item-comment-counter">{gif.commentsCount || 0}</span>
        </li>
        <li className="block-item-recept">
          <i className="material-icons"></i>
          <span className="block-item-recept-counter">{gif.receptsCount || 0}</span>
        </li>
        <li className="block-item-views">
          <i className="material-icons"></i>
          <span className="block-item-views-counter">{gif.viewsCount || 0}</span>
        </li>
      </ul>
      <a href="#" className="block-item-uploader">
        <img
          src="http://via.placeholder.com/24x24"
          className="block-item-uploader-avatar"
          alt="Periquito de los Palotes"
        />
        <span className="block-item-uploader-name">Periquito de los Palotes</span>
      </a>
    </div>
  </div>
);
