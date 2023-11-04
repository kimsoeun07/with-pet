// import React, { useEffect, useState, useRef } from "react";
// import { format } from "date-fns";
// import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
// import { Agenda } from 'react-native-calendars';
// import WebView from 'react-native-webview';
// import { getApps, initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useMemo } from "react";
// import { useCallback } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyAE0QB1aMijN9XjGYXoCbYX0cBZx2wPPaI",
//   authDomain: "test-aae13.firebaseapp.com",
//   databaseURL: "https://test-aae13-default-rtdb.firebaseio.com",
//   projectId: "test-aae13",
//   storageBucket: "test-aae13.appspot.com",
//   messagingSenderId: "798180387857",
//   appId: "1:798180387857:web:5cb93874eb94fa4d7915b0"
// };

// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }


// function CalendarView() {
//   const webViewRef = useRef();

//   const posts = [
//     {
//       id: 1,
//       title: "제목입니다.",
//       contents: "내용입니다.",
//       date: "2022-02-26",
//     },
//     {
//       id: 2,
//       title: "제목입니다.",
//       contents: "내용입니다.",
//       date: "2022-02-27",
//     },
//   ];


//   const [items, setItems] = useState({});
//   const [userID, setUserID] = useState('');
//   const [coords, setCoords] = useState([]);


//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, user => {
//       if (!user) {
//         console.log("로그아웃 상태입니다.");
//         setUserID(null);
//       } else {
//         console.log("현재 로그인된 구글 이메일 주소: ", user.email);
//         setUserID(user.email);
//       }
//     });
//   }, []);

// const [dateString, setDateString] = useState('')
//   // 메모 데이터를 가져오거나 업데이트하는 함수
//   //이거다 이거
//   const loadItems = async (day) => {
//     try {
//       // await onAuthChangedListener();
//       // 서버로부터 해당 날짜에 대한 데이터를 가져옵니다. http://172.30.14.29:5000 ${userID} 
//       const userid = "ksoeun6204@naver.com"
//       setDateString(day.dateString);

//       if (day.dateString === undefined) return;
//       if (items[dateString]) {
//         // 이미 가져온 데이터가 있으면 다시 요청하지 않음
//         return;
//       }

//       const response = await fetch(`https://petmap-ten.vercel.app/api/walkmemo?date=${day.dateString}&userID=${userid}`)

//       if (!response.ok) {
//         console.error("Server response:", response);
//         return;
//       }

//       console.log(`https://petmap-ten.vercel.app/api/walkmemo?date=${day.dateString}&userID=${userid}`)
//       const data = await response.json();
//       // console.log('Server data:', data);
//       // console.log(data.imageURL);

//       setCoords(data.coords)
//       // // items 객체에 메모 아이템을 저장합니다.
//       setItems({
//         [day.dateString]: [data],
//       });

//       console.log(items)

//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }

//   };


//   // const renderItem = ({ item }) => {

//   //   const { imageURL, time, date } = result;
//   //   const coords = imageURL[0]; // 배열의 첫 번째 요소를 가져옴

//   //   console.log(item)

//   //   return (
//   //     <View >S
//   //       {/* item */}
//   //       {item.map((result, index) => (
//   //         <View key={index} style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
//   //           <WebView
//   //             ref={webViewRef}
//   //             // style={styles.webview}
//   //             style={{ width: 100, height: 100 }}
//   //             source={{ uri: `https://petmap-ten.vercel.apps/MapView` }}
//   //             onLoad={() => {
//   //               if (webViewRef.current) {
//   //                 webViewRef.current.postMessage(result.coords);
//   //               }
//   //             }}
//   //           />
//   //           <Text>coords : {result.coords}</Text>
//   //           <Text>산책한 시간 : {result.time}</Text>
//   //           <Text>산책한 날짜 : {String(result.date).slice(0, -4)}</Text>
//   //         </View>
//   //       ))
//   //       }
//   //     </View>

//   //   );
//   // };

//   const array = `Array [
//     Object {
//       "date": "2023-11-02T12:08:33.408Z",
//       "imageURL": Array [
//       Array[
//       37.3060008,
//       126.8664034,
//         ],
//       ],
//       "time": "00:00:10",
//       "userID": "ksoeun6204@naver.com",
//     },
//   ]`
//   // item
//   const renderItem = () => {
//     // console.log(`ITEM : ${item}`);

//     // if (!item) {
//     //   return <Text>해당 날짜에 산책 데이터가 없습니다.</Text>;
//     // }

//     return (
//       <View>
//         {/* {item.map((result, index) => { */}
//         {/* const { imageURL, time, date } = result; */}
//         {/* const coords = imageURL[0]; */}
//         {/* key={index */}
//         {/* return ( */}
//         <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10, height: 300 }}>
//           <WebView
//             ref={webViewRef}
//             // style={styles.webview}
//             style={{ width: 300, height: 100 }}
//             source={{ uri: `https://petmap-ten.vercel.app/MapView` }}
//             // onLoad={() => {
//             //   if (webViewRef.current) {
//             //     // webViewRef.current.postMessage(result.coords);
//             //     webViewRef.current.postMessage(JSON.stringify([37.3060008, 126.8664034]));

//             //   }
//             // }}
//             javaScriptEnabledAndroid={true}
//           />
//           {/* <Text>coords: {coords[0]}, {coords[1]}</Text> */}
//           <Text>산책한 시간: 00:05:55</Text>
//           {/* {time} */}
//           <Text>산책한 날짜: {dateString}</Text>
//           {/* {String(date).slice(0, -4)} */}
//         </View>
//         {/* ); */}
//         {/* })} */}
//       </View>
//     );
//   };

//   return (

//     <Agenda
//       items={items}
//       loadItemsForMonth={loadItems}
//       renderItem={renderItem}
//       style={{ marginTop: 25 }}
//     />

//   );
// }



// export default CalendarView;

import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Agenda } from 'react-native-calendars';
import WebView from 'react-native-webview';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { json } from "express";

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

  const [isDataLoading, setIsDataLoading] = useState(true); // 데이터 로딩 상태 추가

  useEffect(() => console.log('state changed', items), [items])

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
      setIsDataLoading(false); // 데이터 로딩 완료 후 상태 업데이트
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsDataLoading(false); // 데이터 로딩 완료 후 상태 업데이트
    }
  };
  const renderItem = (item) => {

    if (isDataLoading) {
      return <Text>Loading data...</Text>;
    }
    console.log(item)

    if (!item) {
      return <Text>해당 날짜에 산책 데이터가 없습니다.</Text>
    }

    return (
      <View >
        {/* item */}
        {item.map((result, index) => (
          <View key={index} style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <WebView
              ref={webViewRef}
              // style={styles.webview}
              style={{ width: 300, height: 100 }}
              source={{ uri: `https://petmap-ten.vercel.app/MapView?data=${JSON.stringify(result.imageURL)}` }}
              onLoad={() => {
                if (webViewRef.current) {
                  // webViewRef.current.postMessage(JSON.stringify(result.imageURL)); http://172.30.16.13:3000
                  webViewRef.current.postMessage(JSON.stringify(result.imageURL))
                }

              }}
            />
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