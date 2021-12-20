import React, { FC } from 'react';
import bind from 'assets/images/bind.png';
import styles from './index.css';

const Overview: FC = () => {
  return (
    <div>
      概览页
      <img src={bind}></img>
      <div className={styles.icon}></div>
    </div>
  );
};

export default Overview;
