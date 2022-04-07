import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeartRatePredictionScreen from '../screen/appScreens/heartRatePredictionScreen/heartRatePredictionScreen';
import ConnectionScreen from '../screen/appScreens/conectionScreen/conectionScreen';
import ProfileScreen from '../screen/appScreens/profileScreen/profileScreen';

const Tab = createBottomTabNavigator();
class AuthNavigator extends Component {
  state = {};
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Heart Rate') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Connection') {
              iconName = focused ? 'bluetooth' : 'bluetooth-sharp';
            }
            else if (route.name === 'Profile'){
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Heart Rate" component={HeartRatePredictionScreen} />
        <Tab.Screen name="Connection" component={ConnectionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
}

export default AuthNavigator;
