import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Button, Text} from 'react-native';
import dog from './dog';
import cat from './cat';

const Tab = createMaterialTopTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="반려견"
        component={dog}
      />
      <Tab.Screen
        name="반려묘"
        component={cat}
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


export default MainScreen;