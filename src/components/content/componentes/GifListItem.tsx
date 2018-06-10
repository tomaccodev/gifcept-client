import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IGif } from '../../../api/gifs';

import './GifListItem.css';

interface IGifListItemProps {
  gif: IGif;
  onClick: () => void;
}

@observer
export default class extends React.Component<IGifListItemProps> {
  @observable private hovered: boolean = false;

  @observable private imageUrl: string = this.props.gif.frameUrlPath;

  public render() {
    const { gif, onClick } = this.props;

    return (
      <div
        className="block-item-wrapper"
        onMouseEnter={this.setHovered}
        onMouseLeave={this.clearHovered}
      >
        <div className="block-item-top">
          <span className="block-item-name" title={gif.description}>
            {this.props.gif.description}
          </span>
          <i className="material-icons"></i>
        </div>
        <a
          className="block-item-gif-container"
          style={{ backgroundImage: `url(${this.imageUrl})`, backgroundColor: gif.color }}
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
          <a href="#" className="block-item-uploader">
            <img
              src="https://via.placeholder.com/24x24"
              className="block-item-uploader-avatar"
              alt="Periquito de los Palotes"
            />
            <span className="block-item-uploader-name">{gif.user.username}</span>
          </a>
        </div>
      </div>
    );
  }

  private preloadAnimation = () => {
    const image = new Image();
    image.addEventListener('load', () => {
      runInAction(() => {
        if (this.hovered) {
          this.imageUrl = image.src;
        }
      });
    });
    image.src = this.props.gif.animationUrlPath;
  };

  @action
  private clearHovered = () => {
    this.hovered = false;
    this.imageUrl = this.props.gif.frameUrlPath;
  };

  @action
  private setHovered = () => {
    this.hovered = true;
    this.preloadAnimation();
  };
}
