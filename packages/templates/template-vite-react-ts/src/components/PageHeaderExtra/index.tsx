import { Select } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.css';

const PageHeaderExtra: FC = () => {
  const dataSource = [
    { value: '1', label: '一' },
    { value: '2', label: '二' },
    { value: '3', label: '三' },
    { value: '4', label: '四' },
  ];
  return (
    <div className={styles.content}>
      <Select
        options={dataSource}
      />
    </div>
  );
};

export default PageHeaderExtra;
