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
  },
};

class Login extends Component {
  userId = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const userId = this.userId.current.value;
    // Add  User ID Validation
    this.props.history.push(`/subscription/${userId}`);
  };

  render() {
    return (
      <div style={styles.background}>
        <div>
          <h1 style={styles.title}>Scull Your Soda</h1>
          <form style={styles.fieldset} onSubmit={this.handleSubmit}>
            <label style={styles.label}>Check my Sodascription</label>
            <input style={styles.inbox} type="text" placeholder="Email" required ref={this.userId} />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
