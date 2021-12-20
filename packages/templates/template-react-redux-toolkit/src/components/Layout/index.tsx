import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { Route } from '@ant-design/pro-layout/es/typings';
import { useSelector } from 'store/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header';
import MenuIcon from './MenuIcon';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import _ from 'lodash';
import defaultSetting from './defaultSetting';
import styles from './index.module.css';
import { getMenu } from 'config/menu'

const App: FC = ({ children }: PropsWithChildren<any>) => {
  const history = useHistory();
  const location = useLocation();
  const {
    title,
    subTitle,
    showTitle,
    showSubTitle,
    showBackArrow,
  } = useSelector(({ pageHeaderSlice }) => pageHeaderSlice);
  const [ username, setUsername ] = useState('');
  const [ pathname, setPathname ] = useState('/');

  useEffect(() => {
    setPathname(location.pathname);
  }, [ location.pathname ]);

  // 获取菜单数据
  const handelMenuInit = async (): Promise<MenuDataItem[]> => {
    // 获取服务器的菜单数据
    const { data: { username = '', menus = [] } = {} } = await getMenu();
    setUsername(username);
    return _.map(menus, v => ({ ...v, icon: <MenuIcon icon={v.icon}/> }));
  };

  const renderMenu = (item: MenuDataItem, dom: React.ReactNode) => {
    return (
      <Link to={item.path || '/'}>{dom}</Link>
    );
  };

  const renderBreadcrumb = (routers: Route[] = []) => {
    return [
      {
        path: '/',
        breadcrumbName: (<HomeOutlined />) as any,
      },
      ...routers,
    ];
  };

  const breadcrumbItemRender = (route: Route, params: any, routes: Route[]) => {
    const first = routes.indexOf(route) === 0;
    return first ? (
      <a onClick={() => history.push(route.path!)}>{route.breadcrumbName}</a>
    ) : (
      <span>{route.breadcrumbName}</span>
    );
  };

  // 渲染Header
  const rightContentRender = () => <Header username={username}/>;

  return (
    <div className={styles.layout}>
      <ProLayout
        className={styles['antd-layout']}
        logo={null}
        menu={{
          request: handelMenuInit,
        }}
        menuItemRender={renderMenu}
        breadcrumbRender={renderBreadcrumb as any}
        onMenuHeaderClick={() => history.push('/')}
        rightContentRender={rightContentRender}
        itemRender={breadcrumbItemRender}
        location={{ pathname }}
        {...defaultSetting}
      >
        <PageContainer
          className={styles['page-container']}
          header={{
            onBack: showBackArrow ? () => history.go(-1) : undefined,
            title: showTitle ? <span className={'ant-page-header-heading-title'}>{title}</span> : null,
            subTitle: showSubTitle ? <span className={'ant-page-header-heading-sub-title'}>{subTitle}</span> : null,
          }}
        >
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
};
export default App;
