import { router } from 'dva';
import List1 from './List1';
import List2 from './List2';
import React, { FC } from 'react';

const { Switch, Route, useRouteMatch } = router;

const List: FC = () => {
  const { path = '/list' } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/list1`} component={List1} />
      <Route exact path={`${path}/list2`} component={List2} />
    </Switch>
  );
};

export default List;
