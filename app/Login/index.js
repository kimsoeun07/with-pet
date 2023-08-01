import React, { useEffect, useState } from "react";
import { FirebaseError, getApps, initializeApp } from "firebase/app";
import "firebase/auth";
// import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { GoogleAuthProvider, browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithPopup } from "firebase/auth";
import { SocialIcon } from 'react-native-elements'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';


// Firebase 프로젝트의 구성 정보
const firebaseConfig = {
  apiKey: "AIzaSyAE0QB1aMijN9XjGYXoCbYX0cBZx2wPPaI",
  authDomain: "test-aae13.firebaseapp.com",
  projectId: "test-aae13",
  storageBucket: "test-aae13.appspot.com",
  messagingSenderId: "798180387857",
  appId: "1:798180387857:web:5cb93874eb94fa4d7915b0"
};

/**
 * 
 * @param {import("firebase/app").FirebaseOptions} firebaseConfig 
 * @returns 
 */
const loginWithGoogle = async (firebaseConfig) => {
  //파이어베이스 받아오고
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  const provider = new GoogleAuthProvider();
  // google대신 다른것으로 할 수도 있음.
  const auth = getAuth();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // google api scope 에서 people api들어가서 주소 바꿔서 다른 정보를 받아올 수도 있음.

  // try catch는 에러를 잡는 구문
  try {
    await setPersistence(auth, browserSessionPersistence);
    // 브라우저에 내 로그인 정보 기록
    const result = await signInWithPopup(auth, provider);
    // 어떻게 뜰지를 말하는 건데 popup이니까 팝업
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // 해석을 해주는 거
    const token = credential?.accessToken;
    // 그 해석 result에서 토큰이랑 유저 받아오는 것
    const user = result.user;
    console.log(user);
    return { token, user }
  } catch (error) {
    if (error instanceof FirebaseError) {
      //파이어베이스 오류인 경우
      const code = error.code;
      const message = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({
        code, message, email, credential
      });
    } else {
      console.log(error);
    }
  }
}

export default function AuthTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase 인증 메서드 호출
      await loginWithEmailAndPassword(email, password);
    } catch (error) {
      // 로그인 실패 시 에러 메시지 출력
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
      //앱이 없어서 하나 만듦
    }
    const auth = getAuth();
    //Auth정보 받아옴
    const un = onAuthStateChanged(auth, user => {
      //어쓰의 상태가 바뀔 때(= 바뀔 때 마다 user함수가 실행 됨)
      curUser = user;
    });
    return () => {
      un();
      //이 페이지가 닫아졌을 때 위 어쓰체인지는 계속 관찰하고 있기 때문에 
      //이 함수는 이 페이지가 닫아졌을 때 실행되는 코드이므로 어쓰체인지드 함수를 멈추는 코드임.
    }
  }, []);

  //로그인 디자인 nativebase
  const Example = () => {
    return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            {/* <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate("./tap/bottomBar")}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            {/* <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              Sign Up
            </Link> */}
          </HStack>
        </VStack>
      </Box>
      <SocialIcon
        title={"Sign In With Google"}
        button={true}
        type={"google"}
        onPress={() => loginWithGoogle(firebaseConfig)}
      ></SocialIcon>
    </Center>;
  };

  return (
    <>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
      
    </>
  );
}