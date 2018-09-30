import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Subscription from '../components/Subscription';
import NotFound from '../components/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/subscription/:userId" component={Subscription} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
