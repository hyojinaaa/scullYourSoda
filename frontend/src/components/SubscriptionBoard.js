import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { firebaseApp } from '../base';
import Navigation from './Navigation';
import Trolly from './Trolly';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import SubscriptionTable from './SubscriptionTable';

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
        <SubscriptionTable />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionBoard);
