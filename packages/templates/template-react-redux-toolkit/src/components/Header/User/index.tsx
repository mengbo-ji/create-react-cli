import { Avatar, Dropdown, Menu, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import React, { FC, memo } from 'react';
import request from 'service/common';
interface IProps {
  username?: string,
}

const User: FC<IProps> = ({ username = 'admin' }) => {
  const history = useHistory();

  async function handleLogout() {
    const { data, message: msg } = await request.logout();
    if (data) {
      history.push('/Login');
    } else {
      message.error(msg);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <LogoutOutlined />
        <span onClick={handleLogout}> 退出登录 </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Avatar shape="square" size="small" src={'https://portal-static.tongdun.cn/static-public/micro-frontend/seed/1.1.2/user.svg'} />
      <Dropdown overlay={menu} placement="bottomCenter" >
        <span style={{ marginLeft: 10, cursor: 'pointer', color: '#fff' }}>{username}</span>
      </Dropdown>
    </>
  );
};

export default memo(User);
