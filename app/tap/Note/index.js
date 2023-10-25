import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Agenda } from 'react-native-calendars';
import WebView from 'react-native-webview';
import { getApps, initializeApp, onAuthStateChanged, getAuth } from "firebase/app";


// //키보드 부분
import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { isEmptyObj } from "native-base";

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

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const [items, setItems] = useState({});
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (!user) {
        setUserID(ull)
      } else {
        setUserID(user.email)
      }
    });
  }, [])


  // 메모 데이터를 가져오거나 업데이트하는 함수
  const loadItems = async (day) => {

    try {
      // 서버로부터 해당 날짜에 대한 데이터를 가져옵니다.
      const response = await fetch(`http://localhost:5000/api/walkmemo?date=${day.dateString}&userID=${userID}`);
      // const response = await fetch(`/api/walkmemo?date=${day.dateString}`);
      const data = await response.json();

      // // items 객체에 메모 아이템을 저장합니다.
      setItems({
        [day.dateString]: [data],
      });

      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItem = (item) => {
    const apikey = 'a0bf728be4ea8a8be3c00464e7c70c98';

    const webViewRef = useRef()

    useEffect(() => {
      webViewRef.current.postMessage(coords);
    }, [])

    return (
      <View >
        {item.map((result, index) => (
          <View key={index} style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <WebView
              ref={webViewRef}
              // style={styles.webview}
              style={{ width: 100, height: 100 }}
              source={{ uri: `http://localhost:3000/MapView` }}
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
    />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  memoContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: "#009688",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  Icon: {
    position: "absolute",
    right: 0
  }
});

export default CalendarView;