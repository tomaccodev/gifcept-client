import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { IGif } from '../../../api/gifs';

import './GifListItem.css';

interface IGifListItemProps {
  gif: IGif;
}

@observer
export default class extends React.Component<IGifListItemProps> {
  @observable private hovered: boolean = false;

  @computed
  get imageUrl() {
    return this.hovered ? `/${this.props.gif.id}.gif` : `/${this.props.gif.id}.png`;
  }

  public render() {
    const { gif } = this.props;

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
          style={{ backgroundImage: `url(${this.imageUrl})` }}
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
              src="http://via.placeholder.com/24x24"
              className="block-item-uploader-avatar"
              alt="Periquito de los Palotes"
            />
            <span className="block-item-uploader-name">{gif.user.username}</span>
          </a>
        </div>
      </div>
    );
  }

  @action
  private clearHovered = () => {
    this.hovered = false;
  };

  @action
  private setHovered = () => {
    this.hovered = true;
  };
}