import React, { Component } from 'react';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  handleSubmit = ev => {
    ev.preventDefault();

    this.props.stripe // eslint-disable-line
      .createToken({ name: 'Name' }) // eslint-disable-line
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        this.sendToken(token);
        this.setState({ complete: true });
      })
      .catch(error => console.log('create token error', error));
  };

  sendToken = token =>
    axios
      .post('http://localhost:8080', {
        source: token.id,
        currency: 'NZD',
        amount: 50,
      })
      .then(responseJson => {
        console.log(responseJson);
        // Do something with the response
      })
      .catch(error => {
        console.log('sendToken error', error);
      });

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
