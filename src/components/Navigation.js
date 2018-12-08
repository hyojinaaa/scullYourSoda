import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
          <Typography variant="h6" color="inherit">
            Subscription
          </Typography>
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
