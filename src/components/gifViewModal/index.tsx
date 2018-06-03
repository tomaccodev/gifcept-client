import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactModal from 'react-modal';

import { IGif } from '../../api/gifs';
import { ILoggedUser } from '../../store/auth';
import Comment from './Comment';

import './GifViewModal.css';

interface IGifViewModalProps {
  isOpen: boolean;
  loggedUser: ILoggedUser | null;
  gif?: IGif;
  onClose: () => void;
  onLike: () => void;
}

@observer
export default class extends React.Component<IGifViewModalProps> {
  public render() {
    const { gif, loggedUser, isOpen, onClose, onLike } = this.props;

    const editButton =
      gif && loggedUser && gif.user.id === loggedUser.id ? (
        <a href="#" className="header-button" title="Edit">
          <i className="material-icons"></i>
        </a>
      ) : null;

    return (
      <ReactModal
        isOpen={isOpen}
        className="gif-popup-wrapper"
        overlayClassName="popup-overlay-wrapper"
      >
        <div className="gif-popup-topbar">
          <div className="gif-popup-topbar-left">
            <a
              href="#"
              className="action-button gif-popup-like-button"
              title="Like"
              onClick={onLike}
            >
              <i className="material-icons"></i>
              <span className="action-button-text">Like</span>
              <span className="action-button-counter">({gif && gif.likesCount})</span>
            </a>
            <a href="#" className="action-button gif-popup-like-recept" title="Recept">
              <i className="material-icons"></i>
              <span className="action-button-text">Recept</span>
              <span className="action-button-counter">({gif && gif.sharesCount})</span>
            </a>
          </div>
          <div className="gif-popup-topbar-right">
            {editButton}
            <a
              href="#"
              onClick={onClose}
              className="header-button gif-popup-button-close"
              title="Close"
            >
              <i className="material-icons"></i>
            </a>
          </div>
          <div className="clearfix" />
        </div>
        <div className="gif-popup-main-title">{gif && gif.description}</div>
        <div className="gif-popup-main-content">
          <div className="gif-popup-main">
            <a href="#" className="gif-popup-gif">
              <img src={gif && gif.animationUrlPath} alt="gif name, gif tags" />
            </a>
            <div className="gif-popup-main-share-wrapper">Share</div>
          </div>
          <div className="gif-popup-comment-wrapper">
            {gif &&
              gif.comments.map(c => <Comment comment={c} key={c.id} loggedUser={loggedUser} />)}
          </div>
        </div>
        <div className="gif-popup-info-wrapper">
          tags: bla, bla, bla
          <br />
          uploaded by {gif && gif.user.username}
        </div>
      </ReactModal>
    );
  }
}
