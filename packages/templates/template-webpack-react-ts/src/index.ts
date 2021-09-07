import '@ant-design/pro-layout/dist/layout.css';
import 'antd/dist/antd.css';
import 'assets/css/base.css';
import 'moment/locale/zh-cn';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading';
import dva from 'dva';
import models from './models';
import router from './router';

const app = dva({
  history: createBrowserHistory(),
  namespacePrefixWarning: false,
  onError(e: Error) {
    console.error(e.stack);
  },
} as any);

app.use(createLoading());

models.forEach(model => {
  app.model(model);
});

app.router(router);
app.start('#root');
