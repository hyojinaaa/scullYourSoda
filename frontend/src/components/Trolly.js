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
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const styles = {
  root: {
    width: '100%',
    padding: '48px',
  },
};

class Trolly extends Component {
  propTypes = {
    classes: PropTypes.shape({}).isRequired,
    trollyState: PropTypes.shape({}).isRequired,
    userData: PropTypes.shape({}).isRequired,
  };

  render() {
    const { classes, trollyState, userData } = this.props;

    const trueTrollyValues = () => {
      const filtered = Object.keys(trollyState).filter(function(key) {
        return trollyState[key];
      });
      return filtered;
    };

    const trolleySubTotal = trueTrollyValues().length * 3.5;

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
            {trueTrollyValues().map(userId => (
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
              <TableCell>${trolleySubTotal} NZD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained" color="primary">
          Proceed to checkout
        </Button>
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
