import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeBaseProvider, Fab, Icon, Box, Center, Button, Modal, FormControl, Input, AlertDialog } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";

// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
// import 'firebase/auth';
// import 'firebase/firestore';
// import '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// const logout = () => {
//   auth().signOut().then(() => {
//     console.log("User signed out!");
//   });
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyAE0QB1aMijN9XjGYXoCbYX0cBZx2wPPaI",
//   authDomain: "test-aae13.firebaseapp.com",
//   databaseURL: "https://test-aae13-default-rtdb.firebaseio.com",
//   projectId: "test-aae13",
//   storageBucket: "test-aae13.appspot.com",
//   messagingSenderId: "798180387857",
//   appId: "1:798180387857:web:5cb93874eb94fa4d7915b0"
// };

// firebase.initializeApp(firebaseConfig);


// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// import { authService } from 'firebase';

export default function Page() {

  const [showModal, setShowModal] = useState(false);


  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);


  return (
    <NativeBaseProvider>
      <View>
        <View style={styles.subject}>
          <Text onPress={() => navigation.navigate("./bottomBar")} style={{left: 10, position: 'absolute'}}>&lt;</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center",}}>
            프로필
            <Icon color="black" as={Ionicons} name="log-out-outline" size="sm" position="absolute" right={15} onPress={() => setIsOpen(!isOpen)} />
          </Text>

          <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>로그아웃</AlertDialog.Header>
                <AlertDialog.Body>
                  정말 로그아웃 하시겠습니까?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                      Cancel
                    </Button>
                    <Button colorScheme="danger" >
                      {/* onPress={() => logout()} */}
                      {/* async () => {
                      try {
                        await firebase.auth().signOut(); // firebase 로그아웃 함수 호출
                        // 로그아웃 성공시 추가 처리
                      } catch (error) {
                        // 로그아웃 실패시 추가 처리
                        console.error('로그아웃 오류:', error);
                      }
                    } */}
                      {/* onPress={onLogOutClick} */}
                      Delete
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>


        </View>

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
              {/* <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} /> */}
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
        <Icon
          as={AntDesign}
          name="pluscircleo"
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "black",
            position: "absolute",
            bottom: -450,
            right: 20
          }}
          onPress={() => navigation.navigate("./user/plusPet")}
        />
      </View>
    </NativeBaseProvider>
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