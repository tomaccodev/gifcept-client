import moment from 'moment';
import React, { useCallback } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { IGif } from '../../api/gifs';
import { ILoggedUser } from '../../stores/auth';
import { copy } from '../../utils/clipboard';

import Comment from './components/comment';
import styles from './GifModal.module.scss';

interface IGifModalProps {
  loggedUser?: ILoggedUser;
  gif?: IGif;
  onClose: () => void;
  onEdit: (gif: IGif) => void;
}

export default ({ loggedUser, gif, onClose, onEdit }: IGifModalProps) => {
  const copyGifUrl = useCallback(() => {
    if (gif) {
      copy(`${window.location.origin}${gif.animationUrlPath}`);
    }
  }, [gif]);

  const editButton = gif && loggedUser && gif.userId === loggedUser.id && (
    <button
      className={styles['header-button']}
      title="Edit"
      onClick={() => {
        onClose();
        onEdit(gif);
      }}
    >
      <i className="material-icons">edit</i>
    </button>
  );

  return (
    <ReactModal
      isOpen={!!gif}
      className={styles['modal-wrapper']}
      overlayClassName={styles['modal-overlay-wrapper']}
    >
      <div className={styles.topbar}>
        <div className={styles['topbar-right']}>
          {editButton}
          <button onClick={onClose} className={styles['header-button']} title="Close">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className={styles['topbar-left']}>
          <button className={styles['action-button']} title="Like" disabled={!loggedUser}>
            <i className="material-icons">favorite</i>
            <span>Like ({gif && gif.likesCount})</span>
          </button>
          <button className={styles['action-button']} title="Recept" disabled={!loggedUser}>
            <i className="material-icons">reply_all</i>
            <span>Recept ({gif && gif.sharesCount})</span>
          </button>
        </div>
      </div>
      <div className={styles['main-title']}>{gif && gif.description}</div>
      <div className={styles['main-content']}>
        <div className={styles.main}>
          <button className={styles.gif}>
            <img src={gif && gif.animationUrlPath} alt="gif name, gif tags" />
          </button>
          <div onClick={copyGifUrl}>Share</div>
        </div>
        <div className={styles['comment-wrapper']}>
          {gif &&
            gif.comments.map((c) => <Comment comment={c} key={c.id} loggedUser={loggedUser} />)}
        </div>
      </div>
      <div className={styles['info-wrapper']}>
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
