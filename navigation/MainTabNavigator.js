import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import MakeRequest from '../screens/MakeRequestScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Clock',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-time${focused ? '' : ''}`
          : 'md-time'
      }
    />
  ),
};

const RequestsStack = createStackNavigator(
  {
    Request: RequestScreen,
    MakeRequest: MakeRequest,
  },
  {
    initialRouteName: 'Request',
  }
);

RequestsStack.navigationOptions = {
  tabBarLabel: 'Requests',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list-box-outline${focused ? '' : ''}` : 'ios-list-box-outline'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  RequestsStack,
});
