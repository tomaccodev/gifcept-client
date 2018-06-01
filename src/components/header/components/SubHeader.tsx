import * as React from 'react';

import './SubHeader.css';

export default () => (
  <div className="subheader">
    <div className="subheader-wrapper">
      <a href="#" className="subheader-button">
        <span className="subheader-button-text">All gifs</span>
      </a>
      <a href="#" className="subheader-button">
        <span className="subheader-button-text">Your gifs</span>
      </a>
      <a href="#" className="subheader-button">
        <span className="subheader-button-text">Your tags</span>
      </a>
      <a href="#" className="subheader-button">
        <span className="subheader-button-text">Hottest tags</span>
      </a>
      <a href="#" className="subheader-button">
        <span className="subheader-button-text">Most liked</span>
      </a>
    </div>
  </div>
);
