import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { firebaseApp } from '../base';
import { withStyles } from '@material-ui/core/styles';
import Navigation from './Navigation';
import background from '../images/calmWaterfall.gif';
import Trolly from './Trolly';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import SubscriptionTable from './SubscriptionTable';

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
});

class SubscriptionBoard extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({}),
    trollyState: PropTypes.shape({}),
    updateUserData: PropTypes.func,
  };

  componentDidMount() {
    const db = firebaseApp.database();
    const ref = db.ref();

    ref.once('value').then(snapshot => {
      const data = snapshot.val() || {};
      this.props.updateUserData(data);
    });
  }

  render() {
    const { trollyState } = this.props;
    const checkedValueExisted = Object.values(trollyState).indexOf(true) >= 0;

    return (
      <Fragment>
        <Navigation />
        <div style={styles.background}>
          <div>
            <h1 style={styles.title}>Scull Your Soda</h1>
            <div style={styles.subscriptionInfoContainer}>
              <SubscriptionTable />
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
)(SubscriptionBoard);
