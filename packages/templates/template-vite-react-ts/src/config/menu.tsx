import { BarsOutlined, HeartOutlined, SmileOutlined } from '@ant-design/icons';
import React from 'react';
export default [
  {
    path: '/overview',
    name: '概览',
    icon: <SmileOutlined />,
  },
  {
    path: '/list',
    name: '列表',
    icon: <BarsOutlined />,
    children: [
      {
        path: '/list/list1',
        name: '列表1',
      },
      {
        path: '/list/list2',
        name: '列表2',
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    icon: <HeartOutlined />,
  },
];
