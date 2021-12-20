import 'assets/css/base.css';
import 'moment/dist/locale/zh-cn';
import { ConfigProvider, message } from 'antd';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from './router';
import React from 'react';
import ReactDOM from 'react-dom';
import locale from 'antd/es/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');

message.config({
  maxCount: 2,
});

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
