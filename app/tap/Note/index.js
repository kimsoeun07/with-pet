import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Button, Text} from 'react-native';
import Calendar from './Calendar';
import walkRecord from './walkRecord'

const Tab = createMaterialTopTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="건강 달력"
        component={Calendar}
      />
      <Tab.Screen
        name="산책 기록"
        component={walkRecord}
      />
    </Tab.Navigator>
  );
}


function SearchScreen() {
  return <Text>Search</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

export default MainScreen;