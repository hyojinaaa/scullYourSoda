import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Checkout from './Checkout';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  root: {
    width: '100%',
    padding: '48px',
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class Trolly extends Component {
  propTypes = {
    classes: PropTypes.shape({}).isRequired,
    trollyState: PropTypes.shape({}).isRequired,
    userData: PropTypes.shape({}).isRequired,
    setCheckoutPrice: PropTypes.func,
  };

  state = {
    open: false,
  };

  trueTrollyValues = () => {
    const { trollyState } = this.props;
    const filtered = Object.keys(trollyState).filter(function(key) {
      return trollyState[key];
    });
    return filtered;
  };

  trolleySubTotal = this.trueTrollyValues().length * 3.5;

  handleOpenCheckout = () => {
    this.props.setCheckoutPrice(this.trolleySubTotal);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, userData } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          SodaScription Trolly
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.trueTrollyValues().map(userId => (
              <TableRow key={userId}>
                <TableCell>
                  One month Sodascription for{' '}
                  <strong>{userData[userId].email}</strong>
                </TableCell>
                <TableCell>$3.5 NZD</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Trolley subtotal: </TableCell>
              <TableCell>${this.trolleySubTotal} NZD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOpenCheckout}
          >
            Proceed to checkout
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Payment
              </Typography>
              <Checkout />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trollyState: state.trolly,
  userData: state.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(Trolly);
