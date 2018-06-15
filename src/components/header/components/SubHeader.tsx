import * as React from 'react';
import { Link } from 'react-router-dom';

import './SubHeader.css';

export default () => (
  <div className="subheader">
    <div className="subheader-wrapper">
      <Link to="/" className="subheader-button">
        <span className="subheader-button-text">All gifs</span>
      </Link>
      <Link to="/myGifs" className="subheader-button">
        <span className="subheader-button-text">Your gifs</span>
      </Link>
      <Link to="/liked" className="subheader-button">
        <span className="subheader-button-text">Most liked</span>
      </Link>
    </div>
  </div>
);
