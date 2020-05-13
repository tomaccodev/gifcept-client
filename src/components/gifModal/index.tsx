import { observer } from 'mobx-react';
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
  onLike: (gif: IGif) => void;
  onUnlike: (gif: IGif) => void;
  onClose: () => void;
  onEdit: (gif: IGif) => void;
  onDelete: (gif: IGif) => void;
}

export default observer(
  ({ loggedUser, gif, onLike, onUnlike, onClose, onEdit, onDelete }: IGifModalProps) => {
    const copyGifUrl = useCallback(() => {
      if (gif) {
        copy(`${window.location.origin}${gif.animationUrlPath}`);
      }
    }, [gif]);

    const editButton = gif && loggedUser && gif.user.id === loggedUser.id && (
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

    const ownedByUser = loggedUser && gif && loggedUser.id === gif.user.id;
    const likedByUser = loggedUser && gif && gif.likes.find((l) => l.user.id === loggedUser.id);

    return (
      <ReactModal
        isOpen={!!gif}
        className={styles['modal-wrapper']}
        overlayClassName={styles['modal-overlay-wrapper']}
        onRequestClose={onClose}
      >
        <div className={styles.topbar}>
          <div className={styles['topbar-right']}>
            {editButton}
            <HeaderButton onClick={onClose} icon="close" title="Close" />
          </div>
          <div className={styles['topbar-left']}>
            <ActionButtom
              text={`${likedByUser ? 'Unlike' : 'Like'} (${gif && gif.likesCount})`}
              icon={likedByUser ? 'favorite_border' : 'favorite'}
              disabled={!loggedUser || ownedByUser}
              onClick={() => gif && (likedByUser ? onUnlike(gif) : onLike(gif))}
            />
            <ActionButtom
              text={`Recept (${gif && gif.sharesCount})`}
              icon="reply_all"
              disabled={!loggedUser || ownedByUser}
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
          tags:{' '}
          {gif &&
            gif.tags.map((t) => (
              <Link
                key={t}
                className={styles.tag}
                onClick={onClose}
                to={gif ? `/tags/${t}/gifs` : ''}
              >
                <i>#</i>
                {t}
              </Link>
            ))}
          <br />
          uploaded by{' '}
          <Link onClick={onClose} to={gif ? `/users/${gif.user.username}/gifs` : ''}>
            {gif && gif.user.username}
          </Link>{' '}
          <span>{gif && moment(gif.created).fromNow()}</span>
        </div>
      </ReactModal>
    );
  },
);
