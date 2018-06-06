import * as React from 'react';

import SubHeader from './components/SubHeader';

import { ILoggedUser } from '../../store/auth';
import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedUser: ILoggedUser | null;
  facebookLogin: () => void;
}

export default ({ loggedUser, facebookLogin }: IHeaderProps) => {
  const userElements = loggedUser ? (
    <div className="header-right">
      <a href="#" className="header-user-name">
        {loggedUser.username}
      </a>
      <a href="#" className="header-button header-avatar" title="Your Profile">
        <img src="http://via.placeholder.com/150x150" alt={loggedUser.username} />
      </a>
      <a href="#" className="header-button" title="Safe For Work View">
        <i className="material-icons">&#xE86C;</i>
      </a>
      <a href="#" className="header-button" title="Your Notifications">
        <i className="material-icons">&#xE7F5;</i>
      </a>
    </div>
  ) : (
    <div className="header-right">
      <a href="#" className="header-button" title="Facebook Login" onClick={facebookLogin}>
        <i className="material-icons">face</i>
      </a>
    </div>
  );

  return (
    <div>
      <header className="header">
        <div className="header-wrapper">
          <div className="header-left">
            <a
              href="#"
              className="header-button header-button-add-gif hide-on-mobile"
              title="Add new gif"
            >
              <i className="material-icons">&#xE145;</i>
            </a>
            <div className="header-button header-search" title="Search gifs">
              <i className="material-icons">&#xE8B6;</i>
              <input type="text" placeholder="Search gifs" />
            </div>
          </div>

          {userElements}
          <div className="clearfix" />
          <div className="header-logo-wrapper">
            <img src={logo} alt="Gifcept" />
          </div>
        </div>
      </header>
      <SubHeader />
    </div>
  );
};
