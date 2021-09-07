import { Button, Result } from 'antd';
import { useHistory } from 'dva';
import React, { FC } from 'react';

const NoFoundPage: FC = () => {
  const history = useHistory();
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => history.push('/overview')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
