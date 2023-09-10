import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";

import { FirebaseError, getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import {
    GoogleAuthProvider, browserSessionPersistence, getAuth,
    onAuthStateChanged, setPersistence, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword
} from "firebase/auth";

// Firebase 프로젝트의 구성 정보
const firebaseConfig = {
    apiKey: "AIzaSyAE0QB1aMijN9XjGYXoCbYX0cBZx2wPPaI",
    authDomain: "test-aae13.firebaseapp.com",
    databaseURL: "https://test-aae13-default-rtdb.firebaseio.com",
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

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}



const Example = () => {

    if (getApps().length === 0) {
        initializeApp(firebaseConfig);
        //앱이 없어서 하나 만듦
    }
    useEffect(() => {

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth(); // auth 변수 초기화

    const signUP = async () => {
        try {


            await createUserWithEmailAndPassword(auth, email, password);

            console.log('회원가입성공')
        } catch (error) {
            // 로그인 실패 시 에러 메시지 출력
            setErrorMessage(error.message);
        }
    }


    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                WithPet회원가입
            </Heading>
            {/* <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading> */}
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>이메일</FormControl.Label>
                    <Input onChangeText={value => setEmail(value)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>비밀번호</FormControl.Label>
                    <Input type="password" onChangeText={value => setPassword(value)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>비밀번호 확인</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={signUP}>
                    Sign up
                </Button>
            </VStack>
        </Box>
    </Center>;
};

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
        </NativeBaseProvider>
    );
};