import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
  return (
    <StripeProvider
      apiKey="pk_test_krCwlJP8KKJybUOd8fkcQggm
    "
    >
      <div className="example">
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export default Checkout;
