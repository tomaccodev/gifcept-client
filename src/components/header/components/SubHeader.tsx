import * as React from 'react';
import { Link } from 'react-router-dom';

import { ILoggedUser } from '../../../store/auth';

import './SubHeader.css';

interface ISubHeaderProps {
  loggedUser: ILoggedUser | null;
}

export default ({ loggedUser }: ISubHeaderProps) => {
  const myGifsLink = !!loggedUser ? (
    <Link to="/myGifs" className="subheader-button">
      <span className="subheader-button-text">Your gifs</span>
    </Link>
  ) : null;

  return (
    <div className="subheader">
      <div className="subheader-wrapper">
        <Link to="/" className="subheader-button">
          <span className="subheader-button-text">All gifs</span>
        </Link>
        {myGifsLink}
        <Link to="/liked" className="subheader-button">
          <span className="subheader-button-text">Most liked</span>
        </Link>
      </div>
    </div>
  );
};
