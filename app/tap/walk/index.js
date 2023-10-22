// import React, { useState } from "react";
// import { StyleSheet, View, Text, Image, TouchableOpacity, CheckBox } from "react-native";

// export default function Page() {
//   const [isSelected, setSelection] = useState(false);

//   return (
//     <View style={styles.container}>
      
//       <View style={styles.imgContainer}>
//         <Image source={require('./img-walk/Illustration/Animal.png')} style={styles.img} />
//       </View>
//         <Text style={{fontWeight: "bold", fontSize: 15, margin: 5}}>산책할 반려동물 선택</Text>


//       <View style={styles.cheakBoxContainer}>
//         <CheckBox
//           value={isSelected}
//           onValueChange={setSelection}
//            />
//         <Text style={styles.text}>강아지1</Text>
//       </View>

      
//       <TouchableOpacity style={styles.but}>
//         <Text style={styles.butText}>산책 시작</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },

//   imgContainer: {
//     maxWidth: 300,
//     width: "50%",
//     aspectRatio: 1, // 이미지의 가로:세로 비율을 1:1로 유지합니다.
//     justifyContent: "center", // 수직 가운데 정렬
//     alignItems: "center", // 수평 가운데 정렬
//   },

//   img: {
//     flex: 1,
//     resizeMode: "contain", // 이미지를 가득 채우면서 비율을 유지합니다.
//   },

//   but: {
//     width: 211,
//     height: 56,
//     backgroundColor: "black",
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },

//   butText: {
//     fontSize: 20,
//     fontWeight: "400",
//     color: "white",
//   },

//   cheakBoxContainer: {
//     width: "70%",
//     height: "50%",
//     margin: 10,
//     borderRadius: 25,
//     padding: 15,
//     flexDirection: "row",
//     backgroundColor: "lightgray"
//   },

//   text: {
//     color: "black",
//     marginLeft: 10,
//     fontSize: 15
//   }
// });


import React from "react";
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      style={{width: 200, height: 200}}
      source={{ uri: 'https://localhost:3000/find' }}
    />
  );
}