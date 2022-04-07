import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SendSMS from 'react-native-sms'

class HeartRatePredictionScreen extends Component {
  // emergencySMSSend = (mobileNumber) => {
  //   console.log('mobileNumber', mobileNumber)
  //   console.log('SendSMS', SendSMS)
  //   SendSMS.send(
  //     {
  //       // Message body
  //       body: `Please check Mr.${this.props.allData.name}, He is suffering from an heart Disease`,
  //       // Recipients Number
  //       recipients: [`${mobileNumber}`],
  //       // An array of types
  //       // "completed" response when using android
  //       successTypes: ['sent', 'queued'],
  //       allowAndroidSendWithoutReadPermission: true
  //     },
  //     (completed, cancelled, error) => {
  //       if (completed) {
  //         console.log('SMS Sent Completed');
  //       } else if (cancelled) {
  //         console.log('SMS Sent Cancelled');
  //       } else if (error) {
  //         console.log('Some error occured');
  //       }
  //     },
  //   );
  // };
  render() {
    console.log('this.props', this.props);
    let BMI = 0;
    let comment = null;
    if (this.props.allData) {
      let m = this.props.allData.weight;
      let h = this.props.allData.height;
      h = h * 0.3048;
      h = h * h;
      BMI = m / h;
      BMI = BMI.toFixed(2);
      if (BMI < 18.5) {
        comment = 'Underweight';
      } else if (BMI >= 18.5 && BMI <= 24.9) {
        comment = 'Normal weight';
      } else if (BMI > 24.9 && BMI <= 29.9) {
        comment = 'Overweight';
      } else if (BMI >= 30.0) {
        comment = 'Obesity';
      }
    }

    return (
      <View style={styles.main}>
        {this.props.allData ? (
          <Text style={styles.heartRateText}>BMI: {BMI} </Text>
        ) : null}
        <Text style={styles.heartRateText}>{comment}</Text>
        <Ionicons name={'heart'} size={200} color={'tomato'} />
        {/* <Image source={{uri: 'https://media.giphy.com/media/LPrn5nvrGscSkrkjBT/giphy.gif'}} style={{width: 30, height: 30}} /> */}
        {this.props.allData ? (
          <Text style={styles.heartRateText}>
            Your Heart Rate: {this.props.allData.heartRate}
          </Text>
        ) : null}
        {/* {this.props.userData.prediction.response === 1 ? (
          <View>
            <Text style={styles.heartRateText}>Your are in Danger</Text>
          </View>
        ) : null} */}
        {this.props.prediction ? (
          <Text style={styles.heartRateText}>
            {this.props.prediction.response === 1
              ? 'Consult a Doctor as your heart rate is shownig abnormal activities.'
              : 'Your heart is in good condition'}
          </Text>
        ) : (
          <Text style={styles.heartRateText}>
            Your heart is in good condition{' '}
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  let {allData, prediction} = state.userData;
  let {userData} = state;
  return {
    allData,
    userData,
    prediction,
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002e4d',
  },
  headingText: {
    color: '#ffd11a',
    fontSize: 10,
  },
  heartRateText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default connect(mapStateToProps, {})(HeartRatePredictionScreen);
