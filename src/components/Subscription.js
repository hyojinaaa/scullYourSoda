import React, { Component } from 'react';
import background from '../images/waterfall.gif';

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
  },
  fieldset: {
    display: 'flex',
    flexWarp: 'wrap',
    border: 'none',
    textAlign: 'center',
  },
  label: {
    color: 'white',
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
  },
};

class Subscription extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>Scull Your Soda</h1>
          <fieldset style={styles.fieldset}>
            <label style={styles.label}>Your Sodascription</label>
            <input style={styles.inbox} type="text" placeholder="Email" required />
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Subscription;
