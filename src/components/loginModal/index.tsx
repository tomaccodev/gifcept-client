import React, { useState } from 'react';
import ReactModal from 'react-modal';

import ActionButton from '../common/actionButton';
import HeaderButton from '../common/headerButton';

import styles from './LoginModal.module.scss';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (usernameOrEmail: string, password: string) => Promise<boolean>;
}

export default ({ isOpen, onClose, onLogin }: ILoginModalProps) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const doLogin = async () => {
    setLoggingIn(true);
    const result = await onLogin(usernameOrEmail, password);
    setLoggingIn(false);
    if (result) {
      onClose();
    } else {
      setLoginFailed(true);
    }
  };

  const loginfFailedWarning = loginFailed && (
    <div className={styles.error}>Login Failed, please retry with correct credentials</div>
  );

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles['modal-wrapper']}
      overlayClassName={styles['modal-overlay-wrapper']}
      onRequestClose={onClose}
    >
      <div className={styles.topbar}>
        <div className={styles['topbar-right']}>
          <HeaderButton icon="close" title="Close" onClick={onClose} />
        </div>
      </div>
      <div className={styles['main-content']}>
        <div className={styles.tab}>
          <h2>Login</h2>
          {loginfFailedWarning}
          <div>
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
                setLoginFailed(false);
              }}
            />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginFailed(false);
              }}
            />
          </div>
          <div>
            <ActionButton text="Login" icon="lock_open" onClick={doLogin} disabled={loggingIn} />
          </div>
        </div>
        <div className={styles.tab}>
          <h2>Register</h2>
          <div>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
          </div>
          <div>
            <ActionButton
              text="Register"
              icon="assignment_turned_in"
              onClick={doLogin}
              disabled={loggingIn}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
