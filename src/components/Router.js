import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../store';
import Login from '../components/Login';
import Subscription from '../components/Subscription';
import NotFound from '../components/NotFound';
import SubscriptionBoard from '../components/SubscriptionBoard';

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/subscription/:userId" component={Subscription} />
        <Route path="/subscriptionBoard" component={SubscriptionBoard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Router;
