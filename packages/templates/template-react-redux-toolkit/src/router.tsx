import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import Layout from 'components/Layout';
import Loading from 'components/Loading';

const Overview = lazy(() => import('pages/Overview'));
const List = lazy(() => import('pages/List'));
const Demo = lazy(() => import('pages/Demo'));
const Error = lazy(() => import('components/404'));

const router = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path={[ '/Login', '/login' ]} component={Login} /> */}
        <Layout>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Redirect to='/overview' from="/" exact />
              <Route path='/overview' component={Overview} />
              <Route path='/list' component={List} />
              <Route path='/demo' component={Demo} />
              <Route path="/*" component={Error} />
            </Switch>
          </Suspense>
        </Layout>
      </Switch>
    </Router>
  );
};

export default router;
