import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from '../landmarks/Index';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
