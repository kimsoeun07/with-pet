import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Agenda } from 'react-native-calendars';
import WebView from 'react-native-webview';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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


function CalendarView() {
  const webViewRef = useRef();

  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-27",
    },
  ];


  const [items, setItems] = useState({});
  const [userID, setUserID] = useState('');
  const [coords, setCoords] = useState([]);

  // useEffect(() => {
  //   const auth = getAuth()
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       setUserID(user.email)
  //     } else {
  //       setUserID(null)
  //     }
  //   });
  // }, [])

  const onAuthChangedListener = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (!user) {
        console.log("로그아웃 상태입니다.");
        setUserID(null)
      } else {
        console.log("현재 로그인된 구글 이메일 주소: ", user.email);
        setUserID(user.email)
      }
    });
  }


  // 메모 데이터를 가져오거나 업데이트하는 함수
  const loadItems = async (day) => {
    try {
      await onAuthChangedListener();
      // 서버로부터 해당 날짜에 대한 데이터를 가져옵니다. http://172.30.14.29:5000 ${userID} 
      const userid = "ksoeun6204@naver.com"
      const response = await fetch(`https://petmap-ten.vercel.app/api/walkmemo?date=${day.dateString}&userID=${userid}`)

      if (!response.ok) {
        console.error("Server response:", response);
        return;
      }

      console.log(`https://petmap-ten.vercel.app/api/walkmemo?date=${day.dateString}&userID=${userid}`)
      const data = await response.json();
      // console.log(data)
console.log('Server data:', data);
      
      setCoords(data.coords)

      // // items 객체에 메모 아이템을 저장합니다.
      setItems({
        [day.dateString]: [data],
      });



    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };


  const renderItem =  ({ item }) => {

    if (!item) {
      return <Text>해당 날짜에 산책 데이터가 없습니다.</Text>
    }

    console.log(item)

    return (
      <View >
        {/* item */}
        {item.map((result, index) => (
          <View key={index} style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <WebView
              ref={webViewRef}
              // style={styles.webview}
              style={{ width: 100, height: 100 }}
              source={{ uri: `https://petmap-ten.vercel.apps/MapView` }}
              onLoad={() => {
                if (webViewRef.current) {
                  webViewRef.current.postMessage(result.coords);
                }
              }}
            />
            <Text>coords : {result.coords}</Text>
            <Text>산책한 시간 : {result.time}</Text>
            <Text>산책한 날짜 : {String(result.date).slice(0, -4)}</Text>
          </View>
          ))
        }
      </View>
      
    );
  };

  return (

    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      renderItem={renderItem}
      style={{ marginTop: 25 }}
    />

  );
}



export default CalendarView;