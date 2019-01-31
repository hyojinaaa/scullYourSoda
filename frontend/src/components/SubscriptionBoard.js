import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { firebaseApp } from '../base';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Navigation from './Navigation';
import background from '../images/calmWaterfall.gif';
import Trolly from './Trolly';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

// To- Dos
// Clean this code
// Config file
const styles = theme => ({
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
  subscriptionInfoContainer: {
    border: '4px solid black',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '24px',
    maxWidth: '450px',
    margin: '0 auto',
  },
  table: {
    minWidth: 700,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class CheckboxList extends React.Component {
  static propTypes = {
    updateTrolly: PropTypes.func,
    classes: PropTypes.shape({}),
    trollyState: PropTypes.shape({}),
  };

  state = {
    checked: {},
    userData: {},
  };

  componentDidMount() {
    const db = firebaseApp.database();
    const ref = db.ref();

    ref.once('value').then(snapshot => {
      const data = snapshot.val() || {};
      this.setState({
        userData: data,
      });
    });
  }

  handleChange = name => event => {
    this.setState(
      {
        ...this.state,
        checked: {
          ...this.state.checked,
          [name]: event.target.checked,
        },
      },
      this.updateTrollyState(name, event.target.checked),
    );
  };

  updateTrollyState = (name, value) => {
    console.log({
      name,
      value,
    });
    this.props.updateTrolly(name, value);
  };

  render() {
    const { classes } = this.props;
    const { userData } = this.state;
    const checkedValueExisted =
      Object.values(this.state.checked).indexOf(true) >= 0;

    console.log({
      state: this.props.trollyState,
    });
    return (
      <Fragment>
        <Navigation />
        <div style={styles.background}>
          <div>
            <h1 style={styles.title}>Scull Your Soda</h1>
            <div style={styles.subscriptionInfoContainer}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>User email</TableCell>
                    <TableCell numeric>Credit</TableCell>
                    <TableCell>Expire</TableCell>
                    <TableCell>Purchase</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(userData).map(userId => (
                    <TableRow key={userId}>
                      <TableCell>
                        <Checkbox
                          checked={this.state.checked.userId}
                          onChange={this.handleChange(userId)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {userData[userId].email}
                      </TableCell>
                      <TableCell numeric>{userData[userId].credit}</TableCell>
                      <TableCell numeric>{userData[userId].expire}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary">
                          Purchase
                          <AddShoppingCartIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {checkedValueExisted && <Trolly />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  trollyState: state.trolly,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(CheckboxList);
