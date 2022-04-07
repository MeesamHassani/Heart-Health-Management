import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

import * as T from '../type';

export const storeAttributes = ({
  emergencyPhoneNumber,
  age,
  sex,
  weight,
  height,
  chestPain,
  restingBloodPressure,
  cholestoral,
  fastingBloodSugar,
  electrocardiographic,
  exerciseInducedAngina,
  oldPeak,
  slope,
  vessels,
  thal,
}) => {
  return (dispatch) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`).update({
      emergencyPhoneNumber,
      age,
      sex,
      weight,
      height,
      chestPain,
      restingBloodPressure,
      cholestoral,
      fastingBloodSugar,
      electrocardiographic,
      exerciseInducedAngina,
      oldPeak,
      slope,
      vessels,
      thal,
    });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .on('value', (snapshot) => {
        console.log('snapshot', snapshot.val());
        dispatch({type: T.FETCH_ALL_DATA, payload: snapshot.val()});
      });
  };
};
export const fetchAllData = () => {
  const {currentUser} = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .on('value', (snapshot) => {
        console.log('snapshot', snapshot.val());
        dispatch({type: T.FETCH_ALL_DATA, payload: snapshot.val()});
      });
  };
};
export const storeHeartRate = ({heartRate}) => {
  return () => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`).update({
      heartRate,
    });
  };
};

export const getPrediction = () => {
  return (dispatch) => {
    const {currentUser} = firebase.auth();
    let attributes = null;
    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .on('value', (snapshot) => {
        attributes = snapshot.val();
      });
    if (attributes) {
      console.log('dssd');
      const age = attributes.age;
      console.log('age', age);
      const sex = attributes.sex;
      const chestPain = attributes.chestPain;
      const restingBloodPressure = attributes.restingBloodPressure;
      const cholestoral = attributes.cholestoral;
      const fastingBloodSugar = attributes.fastingBloodSugar;
      const electrocardiographic = attributes.electrocardiographic;
      const heartRate = attributes.heartRate;
      const exerciseInducedAngina = attributes.exerciseInducedAngina;
      const oldPeak = attributes.oldPeak;
      const slope = attributes.slope;
      const vessels = attributes.vessels;
      const thal = attributes.thal;
      axios
        .get(
          `http://172.20.10.2/hhm/svm_saved.py?age=${age}&sex=${sex}&chestPain=${chestPain}&restingBloodPressure=${restingBloodPressure}&cholestoral=${cholestoral}&fastingBloodSugar=${fastingBloodSugar}&electrocardiographic=${electrocardiographic}&heartRate=${heartRate}&exerciseInducedAngina=${exerciseInducedAngina}&oldPeak=${oldPeak}&slope=${slope}&vessels=${vessels}&thal=${thal}`,
        )
        .then((response) => {
          console.log('response', response);
          dispatch({type:T.GET_PREDICTION, payload: response.data})
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };
};
