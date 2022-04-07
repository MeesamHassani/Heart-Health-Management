import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';

import {CardSection, Button, Input, Spinner} from '../../../components/common';
import {storeAttributes} from '../../../redux/backEnd/actions';

class ProfileScreen extends Component {
  state = {
    emergencyPhoneNumber: this.props.allData.emergencyPhoneNumber,
    age: this.props.allData.age,
    sex: this.props.allData.sex,
    weight: this.props.allData.weight,
    height: this.props.allData.height,
    chestPain: this.props.allData.chestPain,
    restingBloodPressure: this.props.allData.restingBloodPressure,
    cholestoral: this.props.allData.cholestoral,
    fastingBloodSugar: this.props.allData.fastingBloodSugar,
    electrocardiographic: this.props.allData.electrocardiographic,
    exerciseInducedAngina: this.props.allData.exerciseInducedAngina,
    oldPeak: this.props.allData.oldPeak,
    slope: this.props.allData.slope,
    vessels: this.props.allData.vessels,
    thal: this.props.allData.thal,
    loading: false,
  };
  onSignOut = () => {
    this.setState({
      loading: true,
    });
    firebase.auth().signOut();
  };
  onSave = () => {
    let {
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
    } = this.state;
    if (age < 12 || age > 100) {
      alert('error! Phone Number is incorect');
      return;
    }
    this.props.storeAttributes({
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
  };
  onEmergencyPhoneNumberChanged = (text) => {
    this.setState({
      emergencyPhoneNumber: text,
    });
  };
  onAgeChanged = (text) => {
    this.setState({
      age: text,
    });
  };
  onSexChanged = (text) => {
    this.setState({
      sex: text,
    });
  };
  onWeightChanged = (text) => {
    this.setState({
      weight: text,
    });
  };
  onHeightChanged = (text) => {
    this.setState({
      height: text,
    });
  };
  onChestPainChanged = (text) => {
    this.setState({
      chestPain: text,
    });
  };
  onRestingBloodPressureChanged = (text) => {
    this.setState({
      restingBloodPressure: text,
    });
  };
  onCholestoralChanged = (text) => {
    this.setState({
      cholestoral: text,
    });
  };
  onFastingBloodSugarChanged = (text) => {
    this.setState({
      fastingBloodSugar: text,
    });
  };
  onElectrocardiographicChanged = (text) => {
    this.setState({
      electrocardiographic: text,
    });
  };
  onExerciseInducedAnginaChanged = (text) => {
    this.setState({
      exerciseInducedAngina: text,
    });
  };
  onOldPeakChanged = (text) => {
    this.setState({
      oldPeak: text,
    });
  };
  onSlopeChanged = (text) => {
    this.setState({
      slope: text,
    });
  };
  onVesselsChanged = (text) => {
    this.setState({
      vessels: text,
    });
  };
  onThalChanged = (text) => {
    this.setState({
      thal: text,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Avatar rounded icon={{name: 'person'}} size={'large'} />
        </View>
        <ScrollView style={styles.scroll}>
          <CardSection>
            <Input
              label={'Emergency No'}
              placeholder={'Your Guardian number'}
              onChangeText={this.onEmergencyPhoneNumberChanged}
              value={this.state.emergencyPhoneNumber}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Age'}
              placeholder={'Age'}
              onChangeText={this.onAgeChanged}
              value={this.state.age}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Sex'}
              placeholder={'1=male or 0=female'}
              onChangeText={this.onSexChanged}
              value={this.state.sex}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Chest Pain'}
              placeholder={'type: 0, 1, 2, 3'}
              onChangeText={this.onChestPainChanged}
              value={this.state.chestPain}
            />
          </CardSection>

          <CardSection>
            <Input
              label={'Weight'}
              placeholder={'in kilograms'}
              onChangeText={this.onWeightChanged}
              value={this.state.weight}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Height'}
              placeholder={`0'.0''`}
              onChangeText={this.onHeightChanged}
              value={this.state.height}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Blood Pressure'}
              placeholder={'in mm Hg'}
              onChangeText={this.onRestingBloodPressureChanged}
              value={this.state.restingBloodPressure}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'cholestoral'}
              placeholder={'cholestoral in mg/dl'}
              onChangeText={this.onCholestoralChanged}
              value={this.state.cholestoral}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'fasting blood sugar'}
              placeholder={'(1 = true or 0 = false)'}
              onChangeText={this.onFastingBloodSugarChanged}
              value={this.state.fastingBloodSugar}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Electrocardiographic'}
              placeholder={'0 or 1'}
              onChangeText={this.onElectrocardiographicChanged}
              value={this.state.electrocardiographic}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Exercise Angina'}
              placeholder={'(1 = yes or 0 = no)'}
              onChangeText={this.onExerciseInducedAnginaChanged}
              value={this.state.exerciseInducedAngina}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'ST depression'}
              placeholder={'0.0 to 6.0'}
              onChangeText={this.onOldPeakChanged}
              value={this.state.oldPeak}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'slope'}
              placeholder={'0, 1, 2...'}
              onChangeText={this.onSlopeChanged}
              value={this.state.slope}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'No of Vessels '}
              placeholder={'0 to 3'}
              onChangeText={this.onVesselsChanged}
              value={this.state.vessels}
            />
          </CardSection>
          <CardSection>
            <Input
              label={'Any Defect'}
              placeholder={'3=normal,6=fixeddefect,7=revdefect'}
              onChangeText={this.onThalChanged}
              value={this.state.thal}
            />
          </CardSection>
          <View style={styles.buttonView}>
            <Button
              onPress={() => this.onSave()}
              style={{backgroundColor: '#ffd11a'}}>
              Save
            </Button>
          </View>
          <View style={styles.buttonView}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <Button onPress={() => this.onSignOut()}>Sign Out</Button>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f33',
  },
  headingText: {
    fontWeight: 'bold',
    fontFamily: 'notoserif',
    fontSize: 50,
    color: '#000',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
  },
  containerStyle: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    opacity: 1,
  },
  buttonView: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    position: 'relative',
  },
});

const mapStateToProps = (state) => {
  const {allData} = state.userData;
  return {
    allData,
  };
};

export default connect(mapStateToProps, {storeAttributes})(ProfileScreen);
