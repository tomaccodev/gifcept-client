import moment from 'moment';
import React, { useCallback } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { IGif } from '../../api/gifs';
import { ILoggedUser } from '../../stores/auth';
import { copy } from '../../utils/clipboard';
import ActionButtom from '../common/actionButton';
import HeaderButton from '../common/headerButton';

import Comment from './components/comment';
import styles from './GifModal.module.scss';

interface IGifModalProps {
  loggedUser?: ILoggedUser;
  gif?: IGif;
  onClose: () => void;
  onEdit: (gif: IGif) => void;
  onDelete: (gif: IGif) => void;
}

export default ({ loggedUser, gif, onClose, onEdit, onDelete }: IGifModalProps) => {
  const copyGifUrl = useCallback(() => {
    if (gif) {
      copy(`${window.location.origin}${gif.animationUrlPath}`);
    }
  }, [gif]);

  const editButton = gif && loggedUser && gif.userId === loggedUser.id && (
    <>
      <HeaderButton
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this gif?')) {
            onClose();
            onDelete(gif);
          }
        }}
        icon="delete"
        title="Delete"
      />
      <HeaderButton
        onClick={() => {
          onClose();
          onEdit(gif);
        }}
        icon="edit"
        title="Edit"
      />
    </>
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
          <HeaderButton onClick={onClose} icon="close" title="Close" />
        </div>
        <div className={styles['topbar-left']}>
          <ActionButtom
            text={`Like (${gif && gif.likesCount})`}
            icon="favorite"
            disabled={!loggedUser}
          />
          <ActionButtom
            text={`Recept (${gif && gif.sharesCount})`}
            icon="reply_all"
            disabled={!loggedUser}
          />
        </div>
      </div>
      <div className={styles['main-title']}>{gif && gif.description}</div>
      <div className={styles['main-content']}>
        <div className={styles.main}>
          <button className={styles.gif}>
            <img src={gif && gif.animationUrlPath} alt={gif?.description} />
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
