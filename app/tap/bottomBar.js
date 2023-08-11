import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Note from './Note';
import user from './user';
import notification from './notification';
import walk from './walk';

const Tab = createMaterialBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      shifting={true}
      activeTintColor="black"
      inactiveTintColor="gray"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '지도',
          tabBarIcon: ({color}) => <Icon name="room" color={color} size={24} />,
          //home
        }}
      />
      <Tab.Screen
        name="Notification"
        component={notification}
        options={{
          tabBarLabel: '알림',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Note"
        component={Note}
        options={{
          tabBarLabel: '기록',
          tabBarIcon: ({color}) => (
            <Icon name="create" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Walk"
        component={walk}
        options={{
          tabBarLabel: '산책',
          tabBarIcon: ({color}) => (
            <Icon name="directions-run" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="user"
        component={user}
        options={{
          tabBarLabel: 'user',
          tabBarIcon: ({color}) => (
            <Icon name="account-circle" color={color} size={24} />
          ),
        }}
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

export default MainScreen;
