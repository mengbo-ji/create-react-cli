import 'antd/dist/antd.min.css';
import 'assets/css/base.css';
import { createBrowserHistory } from 'history';
import ReactDom from 'react-dom';
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

// history 被esbuild 之后还会存在 require is not defined
// https://github.com/vitejs/vite/issues/3376
try {
  window.require = function(id: string) {
    switch (id) {
      case 'react-dom':
        return ReactDom;
      default:
        break;
    }
  };
} catch (err) {
  console.log(err);
}

app.router(router);
app.start('#root');
