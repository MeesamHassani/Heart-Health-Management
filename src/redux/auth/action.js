import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as T from '../type';

export const authenticateUser = ({email, password}) => {
  console.log('Log in');
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        dispatch({type: T.LOGIN_SUCCESS, payload: user, signedin: true});
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signUpUser = ({email, password, name}) => {
  return (dispatch) => {
    console.log('Sign Up');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        dispatch({type: T.LOGIN_SUCCESS, payload: user, signedin: true});
        user
          .updateProfile({
            displayName: name,
          })
          .catch((error) => {
            throw error;
          });
        const {currentUser} = firebase.auth();
        firebase
          .database()
          .ref(`/users/${currentUser.uid}`)
          .set({email, name});
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };
};

export const userSignedIn = (user) => {
  return (dispatch) => {
    dispatch({type: T.LOGIN_SUCCESS, payload: user, signedin: true});
  };
};

export const userNotSignedIn = () => {
  return (dispatch) => {
    dispatch({type: T.USER_NOT_LOGGEDIN, payload: {}, signedin: false});
  };
};
