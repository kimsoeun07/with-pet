import React, { useState, useEffect } from "react";
import CustomImage from "./Image";
import { TextArea, Box, NativeBaseProvider, Radio, Text, Flex, View } from "native-base";
import { Button } from "react-native";

import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getApps,
  // 파이어베이스는 하나당 하나의 기능만을 쓸 수 있음. 앱들을 많이 만들어 낼 수 있는데, 그걸 가져오는 거
  initializeApp,
} from 'firebase/app';

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


const PlusPetScreen = () => {

  const [photo, setPhoto] = useState(undefined);
  const [value, setValue] = React.useState("one");
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [userID, setUserID] = useState('');

  // 로그아웃 확인하기

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        console.log("로그아웃 상태입니다.");
      } else {
        setUserID(user.email)
      }
    });

  }, [])

  // express모듈과의 연결을 시도한 코드
  const uploadToServer = async () => {
    try {
      // 서버 엔드포인트 URL 설정 (Express.js 서버 주소)
      const serverUrl = "http://localhost:5000/api/users/add"; // 적절한 엔드포인트 URL로 변경

      // 서버로 보낼 데이터 객체 생성
      const data = {
        imageURL : photo,
        userID: userID,
        name: name,
        birthday: birth,
        kind: value,
      };

      // 서버로 POST 요청 보내기
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 서버에서 응답이 성공적으로 왔을 때 처리
        console.log("데이터 업로드 성공");
      } else {
        // 서버에서 응답이 실패했을 때 처리
        console.error("데이터 업로드 실패");
      }
    } catch (error) {
      console.error("데이터 업로드 중 오류 발생:", error);
    }
  };

  const handlePhotoChange = (selectedUri) => {
    setPhoto(selectedUri);
  };


  return (
    <NativeBaseProvider>
      {/*  */}
      {/* <View style={{ bg: "white", padding: 10, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 17 }} onPress={() => navigation.navigate("../bottomBar")}>&lt;</Text>
        <Text style={{ fontWeight: "bold", fontSize: 17, textAlign: "center", width: "100%" }}>반려동물 정보 입력</Text>
      </View> */}
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 10 }}>
        <CustomImage  style={{ width: 200, height: 200 }} url={photo} onChangePhoto={handlePhotoChange} />
      </View>

      <Flex justifyContent="center" alignItems="center" margin={5}>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Radio value="one" my={1} mx={2}>
              dog
            </Radio>
            <Radio value="two" my={1} mx={2}>
              cat
            </Radio>
          </Flex>
        </Radio.Group>
      </Flex>

      <Box w="100%" mt={4} paddingLeft={5} >
        {/* alignItems="center"  */}
        <Flex direction="row" alignItems="center">
          <Text style={{ margin: 10, left: 0, width: 75 }}>이름</Text>
          <TextArea h={10} placeholder="반려동물 이름" w="65%" maxW="300" onChangeText={value => { setName(value) }} />
        </Flex>
        <br />
        <Flex direction="row" alignItems="center">
          <Text style={{ margin: 10, width: 75 }}>생년월일</Text>
          <TextArea h={10} placeholder="2008-07-02의 형식으로 적어주세요" w="65%" maxW="300" onChangeText={value => { setBirth(value) }} />
        </Flex>
      </Box>


      <Box style={{ marginTop: 30, width: "100%", alignItems: "center" }} class="bg-Teal-500">
        <Button
          onPress={uploadToServer} //() => navigation.navigate("../bottomBar")() => navigation.navigate("../tap/bottomBar")
          buttonStyle={{
            height: 30,
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'teal',
          }}
          // class= "bg-Teal-500"
          title="입력 완료"
        />
      </Box>

    </NativeBaseProvider>
  );
};

export default PlusPetScreen;