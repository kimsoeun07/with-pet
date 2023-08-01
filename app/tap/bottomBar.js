import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Note from './Note';
import user from './user';
import notification from './notification';

const Tab = createMaterialBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
      }}>
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
        component={walkScreen}
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
      {/* <Button
        title="상세보기"
        onPress={() => navigation.push('Detail', {id: 1})}
      /> */}
    </View>
  );
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function walkScreen() {
  return <Text>walk</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

export default MainScreen;