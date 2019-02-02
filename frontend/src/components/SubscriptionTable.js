import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class SubscriptionTable extends React.Component {
  static propTypes = {
    updateTrolly: PropTypes.func,
    classes: PropTypes.shape({}),
    trollyState: PropTypes.shape({}),
    userData: PropTypes.shape({}),
  };

  handleChange = name => event => {
    this.props.updateTrolly(name, event.target.checked);
  };

  render() {
    const { classes, trollyState, userData } = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>User email</TableCell>
            <TableCell numeric>Credit</TableCell>
            <TableCell numeric>Expire</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(userData).map(userId => (
            <TableRow key={userId}>
              <TableCell>
                <Checkbox
                  checked={trollyState.userId}
                  onChange={this.handleChange(userId)}
                />
              </TableCell>
              <TableCell>{userData[userId].email}</TableCell>
              <TableCell numeric>{userData[userId].credit}</TableCell>
              <TableCell numeric>{userData[userId].expire}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
)(SubscriptionTable);
