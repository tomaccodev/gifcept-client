import * as React from 'react';
import * as ReactModal from 'react-modal';

import { IGif } from '../../api/gifs';
import { ILoggedUser } from '../../store/auth';
import './GifViewModal.css';

interface IGifViewModalProps {
  isOpen: boolean;
  loggedUser: ILoggedUser | null;
  gif?: IGif;
  onClose: () => void;
}

export default ({ isOpen, loggedUser, gif, onClose }: IGifViewModalProps) => {
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
          <a href="#" className="action-button gif-popup-like-button" title="Like">
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
          <div className="gif-single-comment-wrapper">
            <div
              className="gif-single-comment-author-pic"
              style={{ backgroundImage: 'url(http://via.placeholder.com/150x150)' }}
            />
            <div className="gif-single-comment-content">
              <div className="gif-single-comment-content-text">
                <a href="#" className="gif-single-comment-author-name">
                  Paco Pepe
                </a>
                This is a very long and interesting comment
              </div>
              <div className="gif-single-comment-tools">
                <a className="gif-single-comment-tools-like" href="#">
                  Like
                </a>
                <a className="gif-single-comment-tools-edit" href="#">
                  Edit
                </a>
                <a className="gif-single-comment-tools-like-counter">
                  <i className="material-icons"></i>
                  <span className="gif-single-comment-tools-like-counter-text">3</span>
                </a>
                <span className="gif-single-comment-tools-time">10 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gif-popup-info-wrapper">
        tags: bla, bla, bla
        <br />
        uploaded by {gif && gif.user.username}
      </div>
    </ReactModal>
  );
};
