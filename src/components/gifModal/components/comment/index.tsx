import moment from 'moment';
import React from 'react';

import { IComment } from '../../../../api/gifs';
import { ILoggedUser } from '../../../../stores/auth';

import styles from './Comment.module.scss';

interface ICommentProps {
  comment: IComment;
  loggedUser?: ILoggedUser;
}

export default ({ comment, loggedUser }: ICommentProps) => {
  const editButton = loggedUser && comment.user.id === loggedUser.id ? <button>Edit</button> : null;

  return (
    <div className={styles['gif-single-comment-wrapper']}>
      <div
        className={styles['gif-single-comment-author-pic']}
        style={{ backgroundImage: 'url(https://via.placeholder.com/150x150)' }}
      />
      <div className={styles['gif-single-comment-content']}>
        <div>
          <button className={styles['gif-single-comment-author-name']}>
            {comment.user.username}
          </button>
          {comment.text}
        </div>
        <div className={styles['gif-single-comment-tools']}>
          <button>Like</button>
          {editButton}
          <button>
            <i className="material-icons">forum</i>
            <span>3</span>
          </button>
          <span>{moment(comment.created).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};
