import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { ILoggedUser } from '../../stores/auth';

import SubHeader from './components/subHeader';
import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedUser?: ILoggedUser;
  onShowLoginModal: () => void;
  onShowAddGifModal: () => void;
  onSearch: (search: string) => void;
}

export default observer(
  ({ loggedUser, onShowLoginModal, onSearch, onShowAddGifModal }: IHeaderProps) => {
    const searchInput = useRef<HTMLInputElement>(null);

    const rating = (
      <button className="header-button" title="Safe For Work View">
        <i className="material-icons">&#xE86C;</i>
      </button>
    );

    const rightSideButtons = loggedUser ? (
      <>
        <span className="header-user-name">{loggedUser.username}</span>
        <button className="header-button header-avatar" title="Your Profile">
          <img src="https://via.placeholder.com/150x150" alt={loggedUser.username} />
        </button>
        {rating}
        <button className="header-button" title="Your Notifications">
          <i className="material-icons">&#xE7F5;</i>
        </button>
      </>
    ) : (
      <>
        <button className="header-button" title="Login" onClick={onShowLoginModal}>
          <i className="material-icons">face</i>
        </button>
        {rating}
      </>
    );

    const addNewGifButton = loggedUser && (
      <button
        className="header-button header-button-add-gif hide-on-mobile"
        title="Add new gif"
        onClick={onShowAddGifModal}
      >
        <i className="material-icons">&#xE145;</i>
      </button>
    );

    return (
      <div>
        <header className="header">
          <div className="header-wrapper">
            <div className="header-left">
              {addNewGifButton}
              <div className="header-button header-search" title="Search gifs">
                <i className="material-icons">&#xE8B6;</i>
                <input
                  type="text"
                  placeholder="Search gifs"
                  onChange={(ev) => {
                    console.log('changing', ev.target.value);
                    onSearch(ev.target.value);
                  }}
                  ref={searchInput}
                />
              </div>
            </div>

            <div className="header-right">{rightSideButtons}</div>
            <div className="clearfix" />
            <div className="header-logo-wrapper">
              <Link to={'/'}>
                <img src={logo} alt="Gifcept" />
              </Link>
            </div>
          </div>
        </header>
        <SubHeader loggedUser={loggedUser} />
      </div>
    );
  },
);
