import Fullscreen from './Fullscreen';
import React, { FC } from 'react';
import User from './User';
import styles from './index.module.css';

interface IProps {
  username?: string,
}

const Header: FC<IProps> = ({ username }) => {
  return (
    <div className={styles.rightContent}>
      {/* 头部导航左侧 */}
      <div className={styles.headerLeft}>
        <Fullscreen />
      </div>
      <div className={styles.headerRight}>
        {/* 个人中心 */}
        <User username={username}/>
      </div>
    </div>);
};

export default Header;
