import { debounce } from 'lodash'; // TODO improve importation to decrease generated js
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import SubHeader from './components/SubHeader';

import { ILoggedUser } from '../../store/auth';
import './Header.css';
import logo from './images/logo.png';

interface IHeaderProps {
  loggedUser: ILoggedUser | null;
  facebookLogin: () => void;
  onSearch: (search: string) => void;
}

const SEARCH_INPUT_PLACEHOLDER = 'Search gifs';
const SEARCH_DEBOUNCE_DELAY = 300;

@observer
export default class extends React.Component<IHeaderProps> {
  private searchInput: React.RefObject<HTMLInputElement>;

  private handleSearchChange = debounce((search: string) => {
    this.props.onSearch(search);
  }, SEARCH_DEBOUNCE_DELAY);

  @observable private searchInputPlaceholder = SEARCH_INPUT_PLACEHOLDER;

  constructor(props: IHeaderProps) {
    super(props);
    this.searchInput = React.createRef();
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  public render() {
    const { loggedUser, facebookLogin } = this.props;

    const userElements = loggedUser ? (
      <div className="header-right">
        <a href="#" className="header-user-name">
          {loggedUser.username}
        </a>
        <a href="#" className="header-button header-avatar" title="Your Profile">
          <img src="https://via.placeholder.com/150x150" alt={loggedUser.username} />
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
              <img src={logo} alt="Gifcept" />
            </div>
          </div>
        </header>
        <SubHeader loggedUser={loggedUser} />
      </div>
    );
  }

  private onSearchChange = (e: React.ChangeEvent) => {
    this.handleSearchChange(this.searchInput.current!.value);
  };

  private handleKeyDown: EventListener = (e: KeyboardEvent) => {
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
