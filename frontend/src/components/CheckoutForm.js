import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import { firebaseApp } from '../base';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  propTypes = {
    checkout: PropTypes.shape({}).isRequired,
  };

  handleSubmit = ev => {
    ev.preventDefault();

    this.props.stripe // eslint-disable-line
      .createToken({ name: 'Name' }) // eslint-disable-line
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        this.setState({
          processing: true,
        });
        this.sendToken(token);
      })
      .catch(error => console.log('create token error', error));
  };

  sendToken = token => {
    const convertDollarsToCents = parseFloat(this.props.checkout.price) * 100;
    return axios
      .post('http://localhost:8080', {
        source: token.id,
        currency: 'NZD',
        amount: convertDollarsToCents,
      })
      .then(response => {
        if (response.status === 200) {
          console.log({ response });
          this.updateCredit();
          this.props.history.push('/paymentSuccess');
        }
      })
      .catch(error => {
        console.log('sendToken error', error);
      });
  };

  findCurrentUserData = userId => this.props.userData[userId];

  trueTrollyValues = () => {
    const { trollyState } = this.props;
    const filtered = Object.keys(trollyState).filter(function(key) {
      return trollyState[key];
    });
    return filtered;
  };

  updateUserData = userId => {
    const currentUserData = this.findCurrentUserData(userId);
    const updatedCredit = parseFloat(currentUserData.credit) + 3.5;
    const formattedCredit = parseFloat(updatedCredit).toFixed(2);
    const newData = {
      ...currentUserData,
      credit: `${formattedCredit}`,
    };
    return newData;
  };

  updateCredit = () => {
    const db = firebaseApp.database();

    this.trueTrollyValues().map(userId => {
      const ref = db.ref(`/HX73UEFkVKXXtFafKiu2I91z1j32/${userId}`);

      ref.set(this.updateUserData(userId), function(error) {
        if (error) {
          console.log({ error });
          // The write failed...
        } else {
          // Data saved successfully!
        }
      });
    });
  };

  render() {
    const { checkout } = this.props;

    if (this.state.processing) return <h1>Proceeding...🤑</h1>;

    return (
      <div className="checkout">
        <Typography variant="subtitle1">
          Proceeding payment for ${checkout.price} NZD
        </Typography>
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  checkout: state.checkout,
  userData: state.userData,
  trollyState: state.trolly,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(withRouter(injectStripe(CheckoutForm)));
