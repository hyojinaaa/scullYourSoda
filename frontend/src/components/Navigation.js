import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const styles = {
  colorDefault: {
    backgroundColor: '#212121',
  },
  root: {
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Anton',
    fontSize: '24px',
    color: 'white',
    fontWeight: '400',
    margin: '0 16px 0 0',
  },
};

class Navigation extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    logout: PropTypes.func,
    loginStatus: PropTypes.bool,
  };

  render() {
    const { classes, logout, loginStatus } = this.props;

    return (
      <AppBar position="absolute" className={classes.colorDefault}>
        <Toolbar className={classes.root}>
          <div style={{ display: 'flex' }}>
            <span style={styles.title}>Scull Your Soda</span>
            <Typography
              variant="subtitle1"
              style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                marginTop: '2px',
              }}
            >
              SodaScription board
            </Typography>
          </div>
          <Button color="inherit" onClick={logout}>
            {loginStatus === true ? `Log out` : `Sign in`}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.accountState.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(Navigation);
