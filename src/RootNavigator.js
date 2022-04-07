import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import 'firebase/auth';

import AppNavigator from './navigators/AppNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import FirebaseConfig from './FirebaseConfig';
import {userSignedIn, userNotSignedIn} from './redux/auth/action';
import  { fetchAllData } from './redux/backEnd/actions';

class RootNavigator extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(FirebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth State Changed');
      if (user) {
        this.props.fetchAllData()
        this.props.userSignedIn(user);
      } else {
        this.props.userNotSignedIn();
      }
    });
  }
  render() {
    return this.props.signedin ? <AppNavigator /> : <AuthNavigator />;
  }
}

const mapStateToPorps = (state) => {
  const {auth} = state;
  return {
    signedin: auth.signedin,
  };
};

export default connect(mapStateToPorps, {userSignedIn, userNotSignedIn, fetchAllData})(
  RootNavigator,
);
