import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import Page from './tap/main';
// import MainScreen from './tap/bottomBar';
import BottomBar from './tap/Bar';

const Stack = createStackNavigator();

function App() {
    return (
      <Stack.Navigator initialRouteName="Page">
      {/* initialRouteName="FirstView" 기본 화면 설정 */}
          <Stack.Screen
              name="BottomBar"
              component={BottomBar}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Page"
              component={Page}
              options={{
                  headerShown: false
              }}
          />
          {/* <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerStyleInterpolator: forFade }} */}
          {/* /> */}
          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
          />
      </Stack.Navigator>
    );
}

export default App;