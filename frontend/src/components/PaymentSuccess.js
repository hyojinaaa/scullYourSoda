import React, { Component } from 'react';
import PropTypes from 'prop-types';
import background from '../images/blowingWaterfall.gif';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    fontFamily: 'Anton',
    fontSize: '32px',
    color: 'white',
    fontWeight: '500',
    marginTop: '0',
  },
};

class PaymentSuccess extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    emptyTrolly: PropTypes.func.isRequired,
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
          <Typography
            style={{ color: 'white', fontSize: '60px', textAlign: 'center' }}
          >
            Purchase Complete!
          </Typography>
          <Typography
            style={{
              color: 'white',
              fontSize: '60px',
              textAlign: 'center',
              marginTop: '0',
            }}
          >
            🤑🤑🤑🤑🤑🤑🤑
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '48px',
            }}
          >
            <Button variant="contained" onClick={this.handleRedirect}>
              Go back to dashboard
            </Button>
          </div>
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
