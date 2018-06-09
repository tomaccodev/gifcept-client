import * as moment from 'moment';
import * as React from 'react';

import { IComment } from '../../api/gifs';
import { ILoggedUser } from '../../store/auth';

import './Comment.css';

interface ICommentProps {
  comment: IComment;
  loggedUser: ILoggedUser | null;
}

export default ({ comment, loggedUser }: ICommentProps) => {
  const editButton =
    loggedUser && comment.user.id === loggedUser.id ? (
      <a className="gif-single-comment-tools-edit" href="#">
        Edit
      </a>
    ) : null;

  return (
    <div className="gif-single-comment-wrapper">
      <div
        className="gif-single-comment-author-pic"
        style={{ backgroundImage: 'url(https://via.placeholder.com/150x150)' }}
      />
      <div className="gif-single-comment-content">
        <div className="gif-single-comment-content-text">
          <a href="#" className="gif-single-comment-author-name">
            {comment.user.username}
          </a>
          {comment.text}
        </div>
        <div className="gif-single-comment-tools">
          <a className="gif-single-comment-tools-like" href="#">
            Like
          </a>
          {editButton}
          <a className="gif-single-comment-tools-like-counter">
            <i className="material-icons"></i>
            <span className="gif-single-comment-tools-like-counter-text">3</span>
          </a>
          <span className="gif-single-comment-tools-time">{moment(comment.created).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};
