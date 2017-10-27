import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../landmarks/Home';
import Index from '../landmarks/Index';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/landmarks" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
