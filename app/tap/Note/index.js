import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Button, Text} from 'react-native';
import Calendar from './Calendar';

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
        component={SearchScreen}
      />
      <Tab.Screen
        name="몸무게 변화"
        component={NotificationScreen}
      />
    </Tab.Navigator>
  );
}
function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

export default MainScreen;