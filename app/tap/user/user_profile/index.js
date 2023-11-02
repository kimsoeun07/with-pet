import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeBaseProvider, Fab, Icon, Box, Center, Button, Modal, FormControl, Input, AlertDialog, Image } from "native-base";
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
// import LoginScreen from '../../Login';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';


const firebaseConfig = {
  apiKey: "AIzaSyAE0QB1aMijN9XjGYXoCbYX0cBZx2wPPaI",
  authDomain: "test-aae13.firebaseapp.com",
  databaseURL: "https://test-aae13-default-rtdb.firebaseio.com",
  projectId: "test-aae13",
  storageBucket: "test-aae13.appspot.com",
  messagingSenderId: "798180387857",
  appId: "1:798180387857:web:5cb93874eb94fa4d7915b0"
};

// firebase.initializeApp(firebaseConfig);
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

{/* 1. 현재 아이디 가져오기
2. fetch로 현재 아이디와 사용자 아이디가 같은 동물 데이터 받아오기
3. 동물 데이터 속 이름, 생년월일, 종류, 프로필 사진(이 부분 오류)를 가져와서 프로필 카드 생성.  */}

/**
 * 
 * @param {import("firebase/app").FirebaseOptions} firebaseConfig 
 * @returns 
 */
// { navigation }

export default function Page() {

  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onModalcancle = () => setShowModal(false)
  const cancelRef = React.useRef(null);
  const [userID, setUserID] = useState('');
  const [data, setData] = useState([]);
  const [data_id, setData_id] = useState('')

  const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
    auth.signOut().then(() => {
      navigation.navigate('Login');
    });
  };

  // 로그아웃 확인하기
  const onAuthChangedListener = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (!user) {
        console.log("로그아웃 상태입니다.");
        // navigation.navigate('login');
        setUserID(ull)
      } else {
        console.log("현재 로그인된 구글 이메일 주소: ", user.email);
        setUserID(user.email)
      }
    });
  }

  const fetchData = async () => {
    try {
      if (!userID) return; // userID 값이 없으면 API 요청 건너뛰기 api.Pet.$userID   /$userID?userID=
      const response = await fetch(`https://petmap-ten.vercel.app/api/Pet/${userID}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);
  // 

  useEffect(() => {
    const unsubscribe = onAuthChangedListener();
    return () => {
      // unsubscribe();
      if (typeof unsubscribe === "function") { // 구독 취소 가능한지 확인
        unsubscribe(); // 클린업 시에 구독 취소
      }
    };
  }, [navigation]);

  const Petdelete = async () => {
      try {
        if (!userID) return; // userID 값이 없으면 API 요청 건너뛰기 api.Pet.$userID   /$userID?userID=
        await fetch(`https://petmap-ten.vercel.app/api/Petdelete/${data_id}`);

        fetchData();
        setIsOpen(false);
        onClose();

      } catch (error) {
        console.error("Error fetching data:", error);
      }

  }

  const windowHeight = Dimensions.get('window').height;
  const iconBottomPosition = windowHeight * 0.1;

  //여기 까지

  return (
    <NativeBaseProvider>
      <View style={{ marginTop: 25 }}>
        <View style={styles.subject}>
          {/* <Text onPress={() => navigation.navigate("./bottomBar")} style={{ left: 10, position: 'absolute' }}>&lt;</Text> */}
          <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center", paddingTop: 10 }}>
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
                    <Button colorScheme="danger" onPress={logout}>
                      Delete
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>

        </View>

        {/* 여기 부터 */}
        <View style={{
          flexDirection: "row", maxHeight: '100%', // 최대 높이를 화면 높이의 30%로 설정
          overflowY: 'auto'
        }}>

          <View>
            {data.map((result, index) => (
              <View key={index} style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10, width: 300, height: 200, flexDirection: "row", justifyContent: "center" }}>
                <Image source={{ uri: result.imageURL }} style={styles.img} alt="잘못된 이미지" />
                <Text style={{ marginLeft: 20, fontWeight: "bold", fontSize: 15 }}>{'\n'}{result.name}{'\n\n'}{result.birthday}</Text>
                <Fab onPress={() => { setData_id(result._id); setShowModal(true) }} renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="delete" size="sm" />} />
              </View>
            ))
            }
          </View>
          {/* 여기 까지 */}

          <Icon
            as={AntDesign}
            name="pluscircleo"
            style={{
              fontSize: 35,
              textAlign: "center",
              fontWeight: "bold",
              color: "black",
              position: "absolute",
              width: 50,
              height: 50,
              bottom: -50,
              right: 20,
              paddingTop: 25
            }}
            //   onPress={() => navigation.navigate("")}
            onPress={() => navigation.navigate('반려동물 정보입력')}
          />

        </View>

        <View style={{ padding: 10 }}>
          <Center>
            <Center>
              <AlertDialog leastDestructiveRef={cancelRef} isOpen={showModal} onClose={onModalcancle}>
                <AlertDialog.Content>
                  <AlertDialog.CloseButton />
                  <AlertDialog.Header>반려동물 정보 삭제</AlertDialog.Header>
                  <AlertDialog.Body>
                    정말 정보를 삭제하시겠습니까?
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button.Group space={2}>
                      <Button variant="unstyled" colorScheme="coolGray" onPress={onModalcancle} ref={cancelRef}>
                        Cancel
                      </Button>
                      <Button colorScheme="danger" onPress={Petdelete}>
                        Delete
                      </Button>
                    </Button.Group>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>

            </Center>
          </Center>
        </View>
      </View>

    </NativeBaseProvider>
  )
}



const styles = StyleSheet.create({
  subject: {
    backgroundColor: "white",
    padding: 15,
  },

  img: {
    display: "flex",
    width: "50%",
    height: "70%",
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 9.727,
    flexShrink: 0,
  }
})
