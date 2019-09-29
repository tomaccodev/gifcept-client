import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './LoginModal.css';
import { action, observable } from 'mobx';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
}

@observer
export default class extends Component<ILoginModalProps> {
  @observable
  private username: string = '';

  @observable
  private password: string = '';

  @action
  setUsername = (username: string) => {
    this.username = username;
  };

  @action
  setPassword = (password: string) => {
    this.password = password;
  };

  doLogin = async () => {
    const result = await this.props.onLogin(this.username, this.password);
    if (result) {
      this.props.onClose();
    }
  };

  public render() {
    const { isOpen, onClose } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        className="modal-wrapper"
        overlayClassName="modal-overlay-wrapper"
      >
        <div className="topbar">
          <div className="topbar-right">
            <button
              onClick={onClose}
              className="header-button gif-popup-button-close"
              title="Close"
            >
              <i className="material-icons"></i>
            </button>
          </div>
          <div className="clearfix" />
        </div>
        <div className="main-content">
          <div>
            <div>
              Username:
              <input
                type="text"
                value={this.username}
                onChange={e => this.setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={this.password}
                onChange={e => this.setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={this.doLogin}>Login</button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}
