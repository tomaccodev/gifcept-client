import React from 'react';

import styles from './ActionButton.module.scss';

interface IActionButtonProps {
  onClick?: () => void;
  text?: string;
  icon?: string;
  disabled?: boolean;
}

export default ({ onClick, text, icon, disabled }: IActionButtonProps) => (
  <button className={styles['acion-button']} onClick={onClick} disabled={disabled} title={text}>
    {icon && <i className="material-icons">{icon}</i>}
    {text && <span>{text}</span>}
  </button>
);
