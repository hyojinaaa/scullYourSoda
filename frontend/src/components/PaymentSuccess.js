import React, { Component } from 'react';
import PropTypes from 'prop-types';
import background from '../images/blowingWaterfall.gif';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

const styles = {
  background: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lobster',
    fontSize: '100px',
    color: 'white',
    fontWeight: '500',
    marginTop: '0',
  },
  fieldset: {
    display: 'flex',
    flexWarp: 'wrap',
    width: '350px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  label: {
    color: 'white',
    margin: '0 auto',
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '400',
  },
  inbox: {
    margin: '16px auto',
    background: 'none',
    border: '4px solid black',
    height: '36px',
    padding: '0 8px',
    width: '350px',
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Roboto',
    outline: 'none',
    marginBottom: '0',
  },
  errorMessage: {
    color: 'red',
    marginTop: '16px',
  },
};

class PaymentSuccess extends Component {
  static propTypes = {
    history: PropTypes.shape({}),
  };

  handleRedirect = () => {
    const { history, emptyTrolly } = this.props;
    emptyTrolly();
    history.push('/');
  };

  render() {
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>Scull Your Soda</h1>
          <p style={{ color: 'white' }}>Purchase Complete!</p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRedirect}
          >
            Go back to dashboard
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(withRouter(PaymentSuccess));
