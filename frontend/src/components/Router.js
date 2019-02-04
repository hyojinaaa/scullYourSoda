import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../store';
import PaymentSuccess from './PaymentSuccess';
import NotFound from './NotFound';
import SubscriptionBoard from './SubscriptionBoard';
import Checkout from './Checkout';

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SubscriptionBoard} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/paymentSuccess" component={PaymentSuccess} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Router;
