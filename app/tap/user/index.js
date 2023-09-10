import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Fab, Icon, Box, Center, Button, Modal, FormControl, Input, AlertDialog } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getApps,
  // 파이어베이스는 하나당 하나의 기능만을 쓸 수 있음. 앱들을 많이 만들어 낼 수 있는데, 그걸 가져오는 거
  initializeApp,
  FirebaseError,
  firebase
} from 'firebase/app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppState } from 'react-native';
import { NativeBaseConfigProvider } from 'native-base';



function Home({ navigation }) {

  const [showModal, setShowModal] = useState(false);
    // 컴포넌트가 마운트될 때 이벤트 리스너 등록
    React.useEffect(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        // AppState 변경 이벤트 처리
        console.log('AppState has changed:', nextAppState);
      });
  
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        subscription.remove(); // 이렇게 remove() 메서드를 사용하여 제거합니다.
      };
    }, []);

  return (
    <NativeBaseProvider>
    <View style={{ padding: 10 }}>
      <Center>
        <Box height="200" w={[300, 300, 400]} padding="3" shadow="2" rounded="lg" _dark={{
          bg: "coolGray.200:alpha.20"
        }} _light={{
          bg: "coolGray.200:alpha.20"
        }} flexDirection="row">
          <View style={styles.img}>
            <Text>프로필 사진</Text>
          </View>
          <Text style={{ marginLeft: 20, fontWeight: "bold", fontSize: 15 }}>{'\n'}이-름{'\n\n'}생일</Text>
          <Fab onPress={() => setShowModal(true)} renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />

          <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>반려동물 정보 수정</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>이름</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>생일</FormControl.Label>
                    <Input />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setShowModal(false);
                    }}>
                      Cancel
                    </Button>
                    <Button onPress={() => {
                      setShowModal(false);
                    }}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </Box>
      </Center>
    </View>
    {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}> {/* TouchableOpacity로 감싸기 */}
    {/* <Icon */}
    {/* //  onPress = {() => navigation.navigate('Profile')} */}
      {/* as={AntDesign}
      name="pluscircleo"
      style={{
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        position: "absolute",
        // bottom: -450,
        right: 20
      }}
    /> */}
    {/* </TouchableOpacity> */} 
    <Button onPress={() => navigation.navigate('Profile')}>이동</Button>
</NativeBaseProvider>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseConfigProvider>
        
      <NavigationContainer independent={true}>
        <MyStack />
      </NavigationContainer>
    </NativeBaseConfigProvider>
    );
}

const styles = StyleSheet.create({
  subject: {
    backgroundColor: "white",
    padding: 15,
  },

  img: {
    display: "flex",
    width: "40%",
    height: "70%",
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 9.727,
    flexShrink: 0,
    backgroundColor: "orange"
  }
})