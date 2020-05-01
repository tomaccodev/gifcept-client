import React from 'react';
import { Link } from 'react-router-dom';

import { ILoggedUser } from '../../../../stores/auth';

import './SubHeader.css';

interface ISubHeaderProps {
  loggedUser?: ILoggedUser;
}

export default ({ loggedUser }: ISubHeaderProps) => {
  const myGifsLink = !!loggedUser ? (
    <Link to="/myGifs" className="subheader-button">
      <span>Your gifs</span>
    </Link>
  ) : null;

  return (
    <div className="subheader">
      <div className="subheader-wrapper">
        <Link to="/" className="subheader-button">
          <span>All gifs</span>
        </Link>
        {myGifsLink}
      </div>
    </div>
  );
};
