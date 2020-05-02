import { observer, useLocalStore } from 'mobx-react';
import React from 'react';
import ReactModal from 'react-modal';

import './LoginModal.scss';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
}

const loginModalStore = () => ({
  email: '',
  password: '',
  setEmail(email: string) {
    this.email = email;
  },
  setPassword(password: string) {
    this.password = password;
  },
});

export default observer(({ isOpen, onClose, onLogin }: ILoginModalProps) => {
  const { email, password, setPassword, setEmail } = useLocalStore(loginModalStore);

  const doLogin = async () => {
    const result = await onLogin(email, password);
    if (result) {
      onClose();
    }
  };

  return (
    <ReactModal isOpen={isOpen} className="modal-wrapper" overlayClassName="modal-overlay-wrapper">
      <div className="topbar">
        <div className="topbar-right">
          <button onClick={onClose} className="header-button" title="Close">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="clearfix" />
      </div>
      <div className="main-content">
        <div>
          <div>
            Username:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button onClick={doLogin}>Login</button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
});
