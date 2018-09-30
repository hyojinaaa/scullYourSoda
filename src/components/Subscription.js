import React, { Component } from 'react';
import background from '../images/waterfall2.gif';
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
  label: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '400',
  },
  subscriptionInfoContainer: {
    border: '4px solid black',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '24px',
  },
};

class Subscription extends Component {
  state = { subscription: {} };

  componentDidMount() {
    const { params } = this.props.match;

    const db = firebaseApp.database();
    const ref = db.ref(`${params.userId}`);

    ref.once('value').then(snapshot => {
      const data = snapshot.val() || {};
      this.setState({
        subscription: {
          expire: data.subscription.expire,
          credit: data.subscription.credit,
        },
      });
    });
  }

  render() {
    const { expire, credit } = this.state.subscription;
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>Scull Your Soda</h1>
          <h2 style={styles.label}>Your Sodascription</h2>
          <div style={styles.subscriptionInfoContainer}>
            <p>
              <strong>Expiration date:</strong> {expire}
            </p>
            <p>
              <strong>Credit left:</strong> ${credit}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscription;
