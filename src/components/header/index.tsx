import * as React from 'react';

import SubHeader from './components/SubHeader';

import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedIn: boolean;
}

export default class extends React.Component<IHeaderProps> {
  public render() {
    const userElements = this.props.loggedIn ? (
      <div className="header-right">
        <a href="#" className="header-user-name">
          Carlos
        </a>
        <a href="#" className="header-button header-avatar" title="Your Profile">
          <img src="http://via.placeholder.com/150x150" alt="John Doe" />
        </a>
        <a href="#" className="header-button" title="Safe For Work View">
          <i className="material-icons">&#xE86C;</i>
        </a>
        <a href="#" className="header-button" title="Your Notifications">
          <i className="material-icons">&#xE7F5;</i>
        </a>
      </div>
    ) : null;

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
  }
}
