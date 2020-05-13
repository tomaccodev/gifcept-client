import React from 'react';

import styles from './Header.module.scss';

export enum HeaderType {
  user = 'user',
  tag = 'tag',
}

interface IHeaderProps {
  type: HeaderType;
  text: string;
}

export default ({ type, text }: IHeaderProps) => {
  return (
    <div className={styles['header-container']}>
      <div className={styles['header-content']}>
        {type === HeaderType.tag && <div className={styles.icon}>#</div>}
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
