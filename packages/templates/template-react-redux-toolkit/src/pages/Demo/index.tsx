import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Component from './Component';
import React, { FC } from 'react';

const Home: FC = () => {
  const { path = '/demo' } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={Component}/>
    </Switch>
  );
};

export default Home;
