import {
  AuditOutlined,
  CalendarOutlined,
  SmileOutlined
} from '@ant-design/icons';
import React, { FC } from 'react';

const iconMap: any = {
  AuditOutlined: <AuditOutlined/>,
  CalendarOutlined: <CalendarOutlined/>,
  SmileOutlined: <SmileOutlined/>,
};

interface IProps {
  icon: string;
}

// 用于渲染菜单图标
const Icon: FC<IProps> = ({ icon }) => iconMap[icon];

export default Icon;
