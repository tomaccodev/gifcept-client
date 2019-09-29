import { debounce } from 'lodash'; // TODO improve importation to decrease generated js
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, RefObject, createRef, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import SubHeader from './components/SubHeader';

import { ILoggedUser } from '../../store/auth';
import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedUser?: ILoggedUser;
  onShowLoginModal: () => void;
  onSearch: (search: string) => void;
}

const SEARCH_INPUT_PLACEHOLDER = 'Search gifs';
const SEARCH_DEBOUNCE_DELAY = 300;

@observer
export default class extends Component<IHeaderProps> {
  private searchInput: RefObject<HTMLInputElement>;

  private handleSearchChange = debounce((search: string) => {
    this.props.onSearch(search);
  }, SEARCH_DEBOUNCE_DELAY);

  @observable
  private searchInputPlaceholder = SEARCH_INPUT_PLACEHOLDER;

  constructor(props: IHeaderProps) {
    super(props);
    this.searchInput = createRef();
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  public render() {
    const { loggedUser, onShowLoginModal } = this.props;

    const rating = (
      <button className="header-button" title="Safe For Work View">
        <i className="material-icons">&#xE86C;</i>
      </button>
    );

    const userElements = loggedUser ? (
      <div className="header-right">
        <span className="header-user-name">{loggedUser.username}</span>
        <button className="header-button header-avatar" title="Your Profile">
          <img src="https://via.placeholder.com/150x150" alt={loggedUser.username} />
        </button>
        {rating}
        <button className="header-button" title="Your Notifications">
          <i className="material-icons">&#xE7F5;</i>
        </button>
      </div>
    ) : (
      <div className="header-right">
        <button className="header-button" title="Login" onClick={onShowLoginModal}>
          <i className="material-icons">face</i>
        </button>
        {rating}
      </div>
    );

    const addNewGifButton = loggedUser ? (
      <button className="header-button header-button-add-gif hide-on-mobile" title="Add new gif">
        <i className="material-icons">&#xE145;</i>
      </button>
    ) : null;

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
                  placeholder={this.searchInputPlaceholder}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  onChange={this.onSearchChange}
                  ref={this.searchInput}
                />
              </div>
            </div>

            {userElements}
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
  }

  private onSearchChange = (_: ChangeEvent) => {
    this.handleSearchChange(this.searchInput.current!.value);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code && e.code === 'KeyF' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.searchInput.current!.focus();
    }
  };

  @action
  private handleInputFocus = () => {
    this.searchInputPlaceholder = '';
    this.searchInput.current!.select();
  };

  @action
  private handleInputBlur = () => {
    this.searchInputPlaceholder = SEARCH_INPUT_PLACEHOLDER;
  };
}
