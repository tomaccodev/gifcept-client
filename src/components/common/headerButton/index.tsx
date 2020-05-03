import React from 'react';

import styles from './HeaderButton.module.scss';

interface IActionButtonProps {
  onClick?: () => void;
  title?: string;
  icon?: string;
  imgUrl?: string;
  imgAlt?: string;
  disabled?: boolean;
}

export default ({ onClick, title, icon, imgUrl, imgAlt, disabled }: IActionButtonProps) => (
  <button className={styles['header-button']} onClick={onClick} disabled={disabled} title={title}>
    {icon && <i className="material-icons">{icon}</i>}
    {imgUrl && <img src={imgUrl} alt={imgAlt} />}
  </button>
);
