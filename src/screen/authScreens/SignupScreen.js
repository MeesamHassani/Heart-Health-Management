import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {signUpUser} from '../../redux/auth/action';
import {CardSection, Button, Input, Spinner} from '../../components/common';
import backgroundImage from '../../assets/images/AuthScreensImage.jpg';

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
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
    name: '',
    number: '',
    confirmPassword: '',
    loading: false,
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
  onNameChanged = (text) => {
    this.setState({
      name: text,
    });
  };

  onConfirmPasswordChanged = (text) => {
    this.setState({
      confirmPassword: text,
    });
  };

  onButtonPress = () => {
    const {email, password, name, confirmPassword} = this.state;
    if (!name) {
      alert('error!', 'User Name is empty');
      return;
    } else if (!email) {
      alert('error!', 'Email is empty');
      return;
    } else if (!password) {
      alert('error!', 'Please enter Password');
      return;
    } else if (password.length < 6) {
      alert('error!', 'enter password at least 6 characters');
      return;
    } else if (password !== confirmPassword) {
      alert('error!', 'Password not Match');
      return;
    }

    this.props.signUpUser({email, password, name});
    this.setState({loading: true});
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.headingView}>
          <Avatar rounded icon={{name: 'people'}} size={'large'} />
        </View>
        <View style={styles.containerStyle}>
          <CardSection>
            <Input
              label={'Name'}
              placeholder={'Name'}
              onChangeText={this.onNameChanged}
              value={this.state.name}
            />
          </CardSection>
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
          <CardSection>
            <Input
              secureTextEntry
              label={'Confirm Password'}
              placeholder={'Confirm password'}
              onChangeText={this.onConfirmPasswordChanged}
              value={this.state.confirmPassword}
            />
          </CardSection>
          <View style={styles.buttonView}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <Button onPress={this.onButtonPress}>Sign Up</Button>
            )}
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontWeight: 'bold',
    fontFamily: 'notoserif',
    fontSize: 50,
    color: '#000',
  },
  containerStyle: {
    flex: 2,
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

export default connect(null, {signUpUser})(SignupScreen);
