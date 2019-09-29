import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { IGif } from '../../../api/gifs';

import imagePreloader from '../../../common/imagePreloader';
import './GifListItem.css';

interface IGifListItemProps {
  gif: IGif;
  onClick: () => void;
}

@observer
export default class extends Component<IGifListItemProps> {
  @observable private hovered: boolean = false;

  @observable private imageUrl: string = this.props.gif.frameUrlPath;

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
        <button
          className="block-item-gif-container"
          style={{ backgroundImage: `url(${this.imageUrl})`, backgroundColor: gif.color }}
          onClick={this.doClick}
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
          <Link className="block-item-uploader" to={`/${gif.user.id}/gifs`}>
            <img
              src="https://via.placeholder.com/24x24"
              className="block-item-uploader-avatar"
              alt="Periquito de los Palotes"
            />
            <span className="block-item-uploader-name">{gif.user.username}</span>
          </Link>
        </div>
      </div>
    );
  }

  @action
  private clearHovered = async () => {
    this.hovered = false;
    await imagePreloader(this.props.gif.frameUrlPath);
    if (!this.hovered) {
      runInAction(() => {
        this.imageUrl = this.props.gif.frameUrlPath;
      });
    }
  };

  @action
  private setHovered = async () => {
    this.hovered = true;
    await imagePreloader(this.props.gif.animationUrlPath);
    if (this.hovered) {
      runInAction(() => {
        this.imageUrl = this.props.gif.animationUrlPath;
      });
    }
  };

  private doClick = (ev: MouseEvent) => {
    ev.preventDefault();
    this.props.onClick();
  };
}
