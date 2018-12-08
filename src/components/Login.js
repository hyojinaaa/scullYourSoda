import React, { Component } from 'react';
import PropTypes from 'prop-types';
import background from '../images/blowingWaterfall.gif';
import * as EmailValidator from 'email-validator';
import { firebaseApp } from '../base';

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
  fieldset: {
    display: 'flex',
    flexWarp: 'wrap',
    width: '350px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  label: {
    color: 'white',
    margin: '0 auto',
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '400',
  },
  inbox: {
    margin: '16px auto',
    background: 'none',
    border: '4px solid black',
    height: '36px',
    padding: '0 8px',
    width: '350px',
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Roboto',
    outline: 'none',
    marginBottom: '0',
  },
  errorMessage: {
    color: 'red',
    marginTop: '16px',
  },
};

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({}),
  };

  userEmail = React.createRef();
  state = {};

  validateEmail = email => {
    return EmailValidator.validate(email);
  };

  forEachSnapshotData = snapshot => {
    let keyValue = '';
    snapshot.forEach(data => {
      keyValue = data.key;
    });
    return keyValue;
  };

  findMatchedUser = email => {
    const { history } = this.props;
    firebaseApp
      .database()
      .ref()
      .orderByChild('email')
      .equalTo(email)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          let keyValue = this.forEachSnapshotData(snapshot);
          history.push(`subscription/${keyValue}`);
        } else {
          this.setState({
            errorMessage: "You're not a cool kid so you're not invited.",
          });
        }
      });
  };

  removeErrorMessage = () => {
    this.setState({
      errorMessage: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const userEmail = this.userEmail.current.value;

    if (this.validateEmail(userEmail)) {
      this.findMatchedUser(userEmail);
    } else {
      this.setState({
        errorMessage:
          'Hey, type a valid email or practice your typing at https://play.typeracer.com',
      });
    }
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>Scull Your Soda</h1>
          <form style={styles.fieldset} onSubmit={this.handleSubmit}>
            <label style={styles.label}>Check my Sodascription</label>
            <input
              style={styles.inbox}
              type="text"
              placeholder="Email"
              required
              ref={this.userEmail}
              onChange={this.removeErrorMessage}
            />
            {errorMessage ? (
              <p style={styles.errorMessage}>{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
