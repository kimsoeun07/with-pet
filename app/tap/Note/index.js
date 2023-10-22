// import React from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {View, Button, Text} from 'react-native';
// import Calendar from './Calendar';
// import walkRecord from './walkRecord'

// const Tab = createMaterialTopTabNavigator();

// function MainScreen() {
//   return (
//     <Tab.Navigator initialRouteName="Home">
//       <Tab.Screen
//         name="건강 달력"
//         component={Calendar}
//       />
//       <Tab.Screen
//         name="산책 기록"
//         component={walkRecord}
//       />
//     </Tab.Navigator>
//   );
// }


// function SearchScreen() {
//   return <Text>Search</Text>;
// }

// function MessageScreen() {
//   return <Text>Message</Text>;
// }

// export default MainScreen;

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Agenda } from 'react-native-calendars';
import { Image } from "react-native-elements";
import WebView from 'react-native-webview';


// //키보드 부분
import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { isEmptyObj } from "native-base";


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

  const [memo, setMemo] = useState("");

  const [memoData, setMemoData] = useState({});

  const handleMemoChange = (text) => {
    // setMemo(text);

    setMemo(text);
    setMemoData((prevMemoData) => ({
      ...prevMemoData,
      [selectedDate]: text,
    }));
  };

  const handleSaveMemo = () => {
    setMemoData((prevMemoData) => ({
      ...prevMemoData,
      [selectedDate]: memo,
    }));

    fetch('/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memoData, date }) // 현재 위치 정보 전송
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSearchResults(data)
      })
      .catch(error => console.error('Error:', error));
  };

  const selectedDateMemo = memoData[selectedDate] || "";

  const markedWithMemoDates = Object.keys(memoData).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  const [items, setItems] = useState({});

  // 메모 데이터를 가져오거나 업데이트하는 함수
  const loadItems = async (day) => {

    try {
      // 서버로부터 해당 날짜에 대한 데이터를 가져옵니다.
      const response = await fetch(`http://localhost:5000/api/walkmemo?date=${day.dateString}`);
      // const response = await fetch(`/api/walkmemo?date=${day.dateString}`);
      const data = await response.json();

      // // items 객체에 메모 아이템을 저장합니다.
      setItems({
        [day.dateString]: [data],
      });

      // 가져온 데이터에서 필요한 속성을 추출하여 메모 아이템으로 저장합니다.
      // const memoItems = [
      //   {
      //     component: (
      //       <View>
      //         <Image source={{ uri: data.imageURL }} style={{ width: 100, height: 100 }} />
      //         <Text>Time: {data.time}</Text>
      //         <Text>Date: {data.date}</Text>
      //       </View>
      //     ),
      //   },
      // ];

      // items 객체에 메모 아이템을 저장합니다.
      // setItems({
      //   [day.dateString]: memoItems,
      // });

      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 아이템 렌더링 함수
  // const renderItem = (item) => {
  //   return (
  //     <View>
  //       <Text>{item.date}</Text>
  //       <Text>{item.time}</Text>
  //     </View>
  //   );
  // };

  const renderItem = (item) => {
    const apikey = 'a0bf728be4ea8a8be3c00464e7c70c98';

    return (
      <View >
        {item.map((result, index) => (
          <View key={index} style={{margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10}}>
            {/* <Image source={{ uri: result.imageURL }} style={{ width: 100, height: 100 }} /> */}
            <WebView
        // ref={ref}
        // style={styles.webview}
        style= {{width: 100, height: 100}}
        source={{uri: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}`}}
        // onNavigationStateChange={e => setNavState(e)}
      />

{/* <Image source={{ uri: `https://dapi.kakao.com/v2/maps/staticmap?appkey=${apikey}&size=100x100&level=3` }} alt="잘못된 이미지" style={{ width: 100, height: 100 }} /> */}
            <Text>산책한 시간 : {result.time}</Text>
            <Text>산책한 날짜 : {String(result.date).slice(0,-4)}</Text>
          </View>
        ))
        }
      </View>
    );
  };

  // {
  //   searchResults.map((result, index) => (
  //     <div key={index}>
  //       <p>{result.사업장명}</p>
  //       <p>{result.도로명전체주소}</p>
  //       <p>{result.소재지전화}</p>
  //       <hr style={{ marginTop: 10, marginBottom: 10 }} />
  //     </div>
  //   ))
  // }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.keyboardAvoidingContainer}
    // >
    //   <View style={styles.container}>
    //     <Calendar
    //       style={styles.calendar}
    //       markedDates={{
    //         ...markedDates,
    //         ...markedWithMemoDates,
    //         [selectedDate]: {
    //           selected: true,
    //           marked: markedDates[selectedDate]?.marked,
    //           dotColor: 'blue',
    //         },
    //       }}
    //       theme={{
    //         selectedDayBackgroundColor: "#009688",
    //         arrowColor: "#009688",
    //         dotColor: "#009688",
    //         todayTextColor: "#009688",
    //       }}
    //       onDayPress={(day) => {
    //         setSelectedDate(day.dateString);
    //       }}
    //     />

    //     <View style={styles.memoContainer}>
    //       <Text style={styles.selectedDate}>{selectedDate}</Text>
    //       <TextInput
    //         style={styles.memoInput}
    //         multiline
    //         placeholder="메모를 입력하세요..."
    //         value={selectedDateMemo}
    //         onChangeText={handleMemoChange}
    //       />
    //       <TouchableOpacity style={styles.saveButton} onPress={handleSaveMemo}>
    //         <Text style={styles.saveButtonText}>저장</Text>
    //       </TouchableOpacity>

    //       <Icon name="pluscircle" size={30} color="black" style={styles.Icon}></Icon>
    //     </View>
    //   </View>
    // </KeyboardAvoidingView>

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