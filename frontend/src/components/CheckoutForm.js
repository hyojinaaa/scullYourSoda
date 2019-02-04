import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import { firebaseApp } from '../base';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class CheckoutForm extends Component {
  state = {
    processing: false,
  };

  propTypes = {
    checkout: PropTypes.shape({}).isRequired,
    userData: PropTypes.shape({}).isRequired,
    trollyState: PropTypes.shape({}).isRequired,
    history: PropTypes.func,
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
    const { checkout, history } = this.props;
    const convertDollarsToCents = parseFloat(checkout.price) * 100;
    return axios
      .post(process.env.REACT_APP_BACKEND_SERVER_URL, {
        source: token.id,
        currency: 'NZD',
        amount: convertDollarsToCents,
      })
      .then(response => {
        if (response.status === 200) {
          console.log({ response });
          this.updateCredit();
          history.push('/paymentSuccess');
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
      const ref = db.ref(`/${userId}`);

      ref.set(this.updateUserData(userId), function(error) {
        if (error) {
          console.log({ error });
        }
      });
    });
  };

  render() {
    const { checkout } = this.props;

    if (this.state.processing) return <h1>Proceeding...🤑</h1>;

    return (
      <div className="checkout" style={{ margin: '24px 0 8px' }}>
        <CardElement style={{ margin: '24px 0' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '24px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Pay ${checkout.price} NZD
          </Button>
        </div>
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
