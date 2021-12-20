import { Spin } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.css';

interface ILoadingProps { }

const Loading: FC<ILoadingProps> = () => {
  return (
    <div className={styles.loading}>
      <Spin size="large" tip="Loading" className={styles['loading-body']} />
    </div>
  );
};

export default Loading;

