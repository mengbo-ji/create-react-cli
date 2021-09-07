import { router } from 'dva';
import Component from './Component';
import React, { FC } from 'react';

const { Switch, Route, useRouteMatch } = router;

const Home: FC = () => {
  const { path = '/demo' } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={Component}/>
    </Switch>
  );
};

export default Home;
