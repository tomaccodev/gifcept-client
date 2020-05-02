import moment from 'moment';
import React from 'react';

import { IComment } from '../../../../api/gifs';
import { ILoggedUser } from '../../../../stores/auth';

import './Comment.scss';

interface ICommentProps {
  comment: IComment;
  loggedUser?: ILoggedUser;
}

export default ({ comment, loggedUser }: ICommentProps) => {
  const editButton =
    loggedUser && comment.user.id === loggedUser.id ? (
      <button className="gif-single-comment-tools-edit">Edit</button>
    ) : null;

  return (
    <div className="gif-single-comment-wrapper">
      <div
        className="gif-single-comment-author-pic"
        style={{ backgroundImage: 'url(https://via.placeholder.com/150x150)' }}
      />
      <div className="gif-single-comment-content">
        <div>
          <button className="gif-single-comment-author-name">{comment.user.username}</button>
          {comment.text}
        </div>
        <div className="gif-single-comment-tools">
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
