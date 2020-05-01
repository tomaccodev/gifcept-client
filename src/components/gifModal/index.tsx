import moment from 'moment';
import React, { useCallback } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { IGif } from '../../api/gifs';
import { ILoggedUser } from '../../stores/auth';
import { copy } from '../../utils/clipboard';

import Comment from './components/comment';
import './GifModal.css';

interface IGifModalProps {
  loggedUser?: ILoggedUser;
  gif?: IGif;
  onClose: () => void;
}

export default ({ loggedUser, gif, onClose }: IGifModalProps) => {
  const copyGifUrl = useCallback(() => {
    if (gif) {
      copy(`${window.location.origin}${gif.animationUrlPath}`);
    }
  }, [gif]);

  const editButton = gif && loggedUser && gif.userId === loggedUser.id && (
    <button
      className="header-button"
      title="Edit"
      onClick={() => {
        onClose();
      }}
    >
      <i className="material-icons">edit</i>
    </button>
  );

  return (
    <ReactModal isOpen={!!gif} className="modal-wrapper" overlayClassName="modal-overlay-wrapper">
      <div className="topbar">
        <div className="topbar-left">
          <button className="action-button" title="Like" disabled={!loggedUser}>
            <i className="material-icons">favorite</i>
            <span>Like ({gif && gif.likesCount})</span>
          </button>
          <button className="action-button" title="Recept" disabled={!loggedUser}>
            <i className="material-icons">reply_all</i>
            <span>Recept ({gif && gif.sharesCount})</span>
          </button>
        </div>
        <div className="topbar-right">
          {editButton}
          <button onClick={onClose} className="header-button" title="Close">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="clearfix" />
      </div>
      <div className="main-title">{gif && gif.description}</div>
      <div className="main-content">
        <div className="main">
          <button className="gif">
            <img src={gif && gif.animationUrlPath} alt="gif name, gif tags" />
          </button>
          <div className="share-wrapper" onClick={copyGifUrl}>
            Share
          </div>
        </div>
        <div className="comment-wrapper">
          {gif &&
            gif.comments.map((c) => <Comment comment={c} key={c.id} loggedUser={loggedUser} />)}
        </div>
      </div>
      <div className="info-wrapper">
        tags: {gif && gif.tags.join(', ')}
        <br />
        uploaded by{' '}
        <Link onClick={onClose} to={gif ? `/${gif.userId}/gifs` : ''}>
          {gif && gif.userName}
        </Link>{' '}
        <span>{gif && moment(gif.created).fromNow()}</span>
      </div>
    </ReactModal>
  );
};
