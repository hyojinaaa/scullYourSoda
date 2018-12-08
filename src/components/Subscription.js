import React, { Component } from 'react';
import background from '../images/calmWaterfall.gif';
import { firebaseApp } from '../base';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
};

class Subscription extends Component {
  state = {};

  componentDidMount() {
    const { params } = this.props.match;

    const db = firebaseApp.database();
    const ref = db.ref(`${params.userId}`);

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

    return (
      <div style={styles.background}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
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
              <strong>Need more credits or have too much money in your bank account?</strong>
              <br /> Send some to 06 0577 0199755 00 Hyojin Jung
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscription;
