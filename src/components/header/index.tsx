import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Rating } from '../../common/constants';
import { ILoggedUser } from '../../stores/auth';

import RatingSelector from './components/ratingSelector';
import SubHeader from './components/subHeader';
import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedUser?: ILoggedUser;
  currentRating: Rating;
  onShowLoginModal: () => void;
  onShowAddGifModal: () => void;
  onSearchChange: (search: string) => void;
  onRatingChange: (rating: Rating) => void;
}

export default observer(
  ({
    loggedUser,
    currentRating,
    onShowLoginModal,
    onSearchChange,
    onShowAddGifModal,
    onRatingChange,
  }: IHeaderProps) => {
    const searchInput = useRef<HTMLInputElement>(null);

    const ratingSelector = (
      <RatingSelector currentRating={currentRating} onRatingChange={onRatingChange} />
    );

    const rightSideButtons = loggedUser ? (
      <>
        <span className="header-user-name">{loggedUser.username}</span>
        <button className="header-button header-avatar" title="Your Profile">
          <img src="https://via.placeholder.com/150x150" alt={loggedUser.username} />
        </button>
        {ratingSelector}
        <button className="header-button" title="Your Notifications">
          <i className="material-icons">&#xE7F5;</i>
        </button>
      </>
    ) : (
      <>
        <button className="header-button" title="Login" onClick={onShowLoginModal}>
          <i className="material-icons">face</i>
        </button>
        {ratingSelector}
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
                    onSearchChange(ev.target.value);
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
