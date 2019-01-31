import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  root: {
    width: '100%',
    padding: '48px',
  },
};

class Trolly extends Component {
  propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

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
            {/* {Object.keys(checkoutDate).map(userId => (
              <TableRow key={userId}>
                <TableCell>{checkoutDate[userId].credit}</TableCell>
                <TableCell>{checkoutDate[userId].expire}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(Trolly);
