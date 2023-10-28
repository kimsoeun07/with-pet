import React, { useState } from "react";
import {
  KeyboardAvoidingView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from "react-native";
import {
  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,
  GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithPopup
} from "firebase/auth";
import { initializeApp, getApps, FirebaseError } from 'firebase/app';
import { SocialIcon } from 'react-native-elements';
import { useRouter } from "expo-router";
// import { useNavigation } from '@react-navigation/native';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { ja } from "date-fns/locale";

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

// Firebase 앱을 초기화
const app = initializeApp(firebaseConfig);
// if (getApps().length === 0) {
//   initializeApp(firebaseConfig);
// }

const LoginScreen = () => {

  const navigation = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithGoogle = async () => {
    //파이어베이스 받아오고
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
    }
    const provider = new GoogleAuthProvider();
    // google대신 다른것으로 할 수도 있음.
    // const auth = getAuth();
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    // const auth = getAuth();
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

      // navigation.navigate("bottomBar");

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


  const handleSignUp = () => {

    const auth = getAuth(); // Firebase Authentication 인스턴스 가져오기

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        navigation.push('/tap/Bar')

        // navigation.navigate('bottomBar', {
        //   screen: 'Home', // 또는 다른 탭 네비게이터의 스크린 이름
        // });
      })
      .catch(error => alert(error.message));
  }

  const handleLogin = () => {
    const auth = getAuth(); // Firebase Authentication 인스턴스 가져오기;
    
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(`${user.email}으로 로그인 됨`);
        navigation.push('/tap/Bar')
      })
      .catch(error => alert(error.message));
  }


  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <View style={styles.inputContainer}>
        <Text style={styles.subject}>with-pet</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        >
        </TextInput>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            // ('bottomBar', { screen: 'Home' })
            // handleLogin
            style={styles.button}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>회원가입</Text>
          </TouchableOpacity>

          <SocialIcon
            title={"Sign In With Google"}
            button={true}
            type={"google"}
            style={styles.icon}
            onPress={() => loginWithGoogle(firebaseConfig)}
          ></SocialIcon>
        </View>


      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  subject: {
    fontSize: 30,
    fontWeight: "500",
    color: '#2bc1c8',//#2dd4bf
    // fontFamily: 'Jockey One',
    margin: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#dbeded', //'white'
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
  icon: {
    width: '60%',
    padding: 15,
    backgroundColor: '#0978b4',// #77767c / #e2e2e2 / #0978b4
    marginTop: 30
  }
})