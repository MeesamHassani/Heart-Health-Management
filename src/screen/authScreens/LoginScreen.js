import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {authenticateUser} from '../../redux/auth/action';
import {
  Card,
  CardSection,
  Button,
  Input,
  Spinner,
} from '../../components/common';
import backgroundImage from '../../assets/images/AuthScreensImage.jpg';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Log In',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    email: '',
    password: '',
    loading: false,
  };

  navigateToSignUp = () => {
    this.props.navigation.push('Signup');
  };

  onEmailChanged = (text) => {
    this.setState({
      email: text,
    });
  };

  onPasswordChanged = (text) => {
    this.setState({
      password: text,
    });
  };

  renderDetail = () => {
    const {email, password} = this.state;
    if (!email && !password) {
      alert('check email and password');
      return;
    }
    this.props.authenticateUser({email, password});
    this.setState({email: '', password: '', loading: true});
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>HHM</Text>
        </View>
        <Card style={{flex: 1}}>
          <CardSection>
            <Input
              label={'Email'}
              placeholder={'example@example.com'}
              onChangeText={this.onEmailChanged}
              value={this.state.email}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label={'Password'}
              placeholder={'password'}
              onChangeText={this.onPasswordChanged}
              value={this.state.password}
            />
          </CardSection>
          <View style={styles.buttonView}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <Button onPress={() => this.renderDetail()}>Log In</Button>
            )}
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>or</Text>
          </View>
          <View style={styles.buttonView}>
            <Button onPress={() => this.navigateToSignUp()}>Sign up</Button>
          </View>
        </Card>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
  },
  headingView: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    // fontWeight: 'bold',
    fontFamily: 'IndieFlower-Regular',
    fontSize: 70,
    color: '#000',
  },
  bottomText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000',
  },
  bottomView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default connect(null, {authenticateUser})(LoginScreen);
