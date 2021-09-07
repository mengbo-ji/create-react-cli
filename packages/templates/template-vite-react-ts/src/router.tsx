import { Router as IRouter, RouterAPI, router as dvaRouter } from 'dva';
import Layout from 'components/Layout';
import React, { Suspense, lazy } from 'react';
const Overview = lazy(() => import('pages/Overview'));
const List = lazy(() => import('pages/List'));
const Demo = lazy(() => import('pages/Demo'));

const { Route, Router, Switch, Redirect } = dvaRouter;

const router: IRouter = (routerApi?: RouterAPI) => {
  if (!routerApi) return {};
  return (
    <Router history={routerApi.history}>
      <Layout>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/overview' component={Overview} />
            <Route path='/list' component={List} />
            <Route path='/demo' component={Demo} />
            <Redirect to='/overview'/>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default router;
