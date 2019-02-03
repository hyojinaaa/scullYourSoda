import React, { Component } from 'react';
import background from '../images/404waterfall.gif';

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
    fontFamily: 'Anton',
    fontSize: '100px',
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0',
  },
  headingTwo: {
    fontFamily: 'Anton',
    fontSize: '60px',
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0',
  },
};

class NotFound extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>404</h1>
          <h2 style={styles.headingTwo}>You are being naughty again</h2>
        </div>
      </div>
    );
  }
}

export default NotFound;
