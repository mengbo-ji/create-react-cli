import { BaseModel, dvaModel, reducer, subscription } from 'utils/dva';
import { IBreadCrumbItem } from 'config/interface';
import { SubscriptionAPI } from 'dva';
import PageHeaderExtra from 'components/PageHeaderExtra';
import React from 'react';

interface IPageHeaderState {
  breadcrumbItems?: IBreadCrumbItem[];
  breadcrumbExtra?: React.ReactNode;
  headerExtra?: React.ReactNode;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  hasBackArrow?: boolean;
  showHeader?: boolean;
}

@dvaModel('pageHeader')
class PageHeader extends BaseModel {
  state: IPageHeaderState = {
    breadcrumbExtra: PageHeaderExtra,
  };

  @subscription
  whenLocationChange({ dispatch, history }: SubscriptionAPI) {
    history.listen(() => {
      // 默认不展示返回
      dispatch(this.showBackArrow(false));

      // 默认清空，其他路由会设置
      dispatch(this.setHeaderExtra(false));
    });
  }

  @reducer
  showBackArrow(hasBackArrow: IPageHeaderState['hasBackArrow']) {
    return {
      ...this.state,
      hasBackArrow,
    };
  }

  @reducer
  setBreadCrumbItems(breadcrumbItems: IPageHeaderState['breadcrumbItems']) {
    return {
      ...this.state,
      breadcrumbItems,
    };
  }

  @reducer
  setBreadCrumbExtra(breadcrumbExtra: IPageHeaderState['breadcrumbExtra']) {
    return {
      ...this.state,
      breadcrumbExtra,
    };
  }

  @reducer
  setTitle(title: IPageHeaderState['title']) {
    return {
      ...this.state,
      title,
    };
  }

  @reducer
  setSubTitle(subTitle: IPageHeaderState['subTitle']) {
    return {
      ...this.state,
      subTitle,
    };
  }

  @reducer
  setHeaderExtra(headerExtra: IPageHeaderState['headerExtra']) {
    return {
      ...this.state,
      headerExtra,
    };
  }

}

export default new PageHeader().model;

declare global {
  interface Actions {
    pageHeader: PageHeader;
  }
}
