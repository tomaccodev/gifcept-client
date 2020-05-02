import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useState } from 'react';
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
  search?: string;
  onShowLoginModal: () => void;
  onShowAddGifModal: () => void;
  onSearchChange: (search: string) => void;
  onRatingChange: (rating: Rating) => void;
}

export default observer(
  ({
    loggedUser,
    currentRating,
    search,
    onShowLoginModal,
    onSearchChange,
    onShowAddGifModal,
    onRatingChange,
  }: IHeaderProps) => {
    const [searchValue, changeSearchValue] = useState(search);

    const ratingSelector = (
      <RatingSelector currentRating={currentRating} onRatingChange={onRatingChange} />
    );

    const updateSearchCallback = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(ev.target.value);
        changeSearchValue(ev.target.value);
      },
      [changeSearchValue, onSearchChange],
    );

    const rightSideButtons = loggedUser ? (
      <>
        <span className="header-user-name">{loggedUser.username}</span>
        <button className="header-button header-avatar" title="Your Profile">
          <img src="https://via.placeholder.com/150x150" alt={loggedUser.username} />
        </button>
        {ratingSelector}
        <button className="header-button" title="Your Notifications">
          <i className="material-icons">notifications_none</i>
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
        className="header-button hide-on-mobile"
        title="Add new gif"
        onClick={onShowAddGifModal}
      >
        <i className="material-icons">add</i>
      </button>
    );

    return (
      <div>
        <header className="header">
          <div className="header-wrapper">
            <div className="header-left">
              {addNewGifButton}
              <div className="header-button header-search" title="Search gifs">
                <i className="material-icons">search</i>
                <input
                  type="text"
                  value={searchValue}
                  placeholder="Search gifs"
                  onChange={updateSearchCallback}
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
