import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import background from '../images/calmWaterfall.gif';
import { firebaseApp } from '../base';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  label: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '32px',
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
  colorDefault: {
    backgroundColor: '#212121',
  },
  root: {
    justifyContent: 'space-between',
  },
};

class Subscription extends Component {
  static propTypes = {
    match: PropTypes.shape({}),
    classes: PropTypes.shape({}).isRequired,
  };

  state = {};

  componentDidMount() {
    const { match } = this.props;

    const db = firebaseApp.database();
    const ref = db.ref(`${match.params.userId}`);

    ref.once('value').then(snapshot => {
      const data = snapshot.val() || {};
      this.setState({
        expire: data.expire,
        credit: data.credit,
        role: data.role,
        email: data.email,
      });
    });
  }

  render() {
    const { expire, credit, role, email } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="absolute" className={classes.colorDefault}>
          <Toolbar className={classes.root}>
            <Typography variant="h6" color="inherit">
              Subscription
            </Typography>
            <Button color="inherit">Log out</Button>
          </Toolbar>
        </AppBar>
        <div style={styles.background}>
          <div>
            <h1 style={styles.title}>Scull Your Soda</h1>
            <div style={styles.subscriptionInfoContainer}>
              <h2 style={styles.label}>Your Sodascription</h2>
              <p>
                <strong>Email:</strong> {email}
              </p>
              {role ? (
                <p>
                  <strong>Role:</strong> {role}
                </p>
              ) : null}
              <p>
                <strong>Expiry date:</strong> {expire}
              </p>
              <p>
                <strong>Credit left:</strong> ${credit}
              </p>
              <p>
                <strong>
                  Need more credits or have too much money in your bank account?
                </strong>
                <br /> Send some to 06 0577 0199755 00 Hyojin Jung
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Subscription);
