import React from 'react';
import { Link } from 'react-router-dom';

import { ILoggedUser } from '../../../../stores/auth';

import styles from './SubHeader.module.scss';

interface ISubHeaderProps {
  loggedUser?: ILoggedUser;
}

export default ({ loggedUser }: ISubHeaderProps) => {
  const myGifsLink = loggedUser ? (
    <Link to={`/users/${loggedUser.username}/gifs`} className={styles['subheader-button']}>
      <span>Your gifs</span>
    </Link>
  ) : null;

  return (
    <div className={styles.subheader}>
      <div className={styles['subheader-wrapper']}>
        <Link to="/" className={styles['subheader-button']}>
          <span>All gifs</span>
        </Link>
        {myGifsLink}
      </div>
    </div>
  );
};
