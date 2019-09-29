import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { format, parse } from 'url';
import { IGif } from '../../api/gifs';
import imagePreloader from '../../common/imagePreloader';
import { ILoggedUser } from '../../store/auth';

import Comment from './Comment';
import './GifViewModal.css';

interface IGifViewModalProps {
  isOpen: boolean;
  loggedUser?: ILoggedUser;
  gif?: IGif;
  onClose: () => void;
  onLike: () => void;
}

@observer
export default class extends Component<IGifViewModalProps> {
  @observable private imageUrl: string = '';

  public async componentDidUpdate() {
    if (
      this.props.gif &&
      this.props.gif.animationUrlPath !== this.imageUrl &&
      this.props.gif.frameUrlPath !== this.imageUrl
    ) {
      runInAction(() => {
        this.imageUrl = this.props.gif!.frameUrlPath;
      });
      await imagePreloader(this.props.gif!.animationUrlPath);
      runInAction(() => {
        this.imageUrl = this.props.gif!.animationUrlPath;
      });
    }
  }

  public render() {
    const { gif, loggedUser, isOpen, onClose, onLike } = this.props;

    const editButton =
      gif && loggedUser && gif.user.id === loggedUser.id ? (
        <button className="header-button" title="Edit">
          <i className="material-icons"></i>
        </button>
      ) : null;

    return (
      <ReactModal
        isOpen={isOpen}
        className="modal-wrapper"
        overlayClassName="modal-overlay-wrapper"
      >
        <div className="topbar">
          <div className="topbar-left">
            <button className="action-button gif-popup-like-button" title="Like" onClick={onLike}>
              <i className="material-icons"></i>
              <span className="action-button-text">Like</span>
              <span className="action-button-counter">({gif && gif.likesCount})</span>
            </button>
            <button className="action-button gif-popup-like-recept" title="Recept">
              <i className="material-icons"></i>
              <span className="action-button-text">Recept</span>
              <span className="action-button-counter">({gif && gif.sharesCount})</span>
            </button>
          </div>
          <div className="topbar-right">
            {editButton}
            <button
              onClick={onClose}
              className="header-button gif-popup-button-close"
              title="Close"
            >
              <i className="material-icons"></i>
            </button>
          </div>
          <div className="clearfix" />
        </div>
        <div className="main-title">{gif && gif.description}</div>
        <div className="main-content">
          <div className="main">
            <button className="gif">
              <img src={this.imageUrl} alt="gif name, gif tags" />
            </button>
            <div className="share-wrapper" onClick={this.copyToClipboard}>
              Share
            </div>
          </div>
          <div className="comment-wrapper">
            {gif &&
              gif.comments.map(c => <Comment comment={c} key={c.id} loggedUser={loggedUser} />)}
          </div>
        </div>
        <div className="info-wrapper">
          tags: {gif && gif.tags.join(', ')}
          <br />
          uploaded by{' '}
          <Link onClick={onClose} to={gif ? `/${gif.user.id}/gifs` : ''}>
            {gif && gif.user.username}
          </Link>{' '}
          <span className="comment-tools-time">
            {gif && moment(gif.created).fromNow()}
          </span>
        </div>
      </ReactModal>
    );
  }

  private copyToClipboard = async () => {
    const navigator = window.navigator as any;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      const currentUrl = parse(window.location.href);
      currentUrl.pathname = `/${this.props.gif && this.props.gif.id}`;
      await navigator.clipboard.writeText(format(currentUrl));
    }
  };
}
