// import React, { useState } from "react";
// import { View, TextInput, Button } from "react-native";

// const Main = () => {
//   const [photo, setPhoto] = useState(undefined);
//   const [petType, setPetType] = useState("one"); // Default to "one" (dog)
//   const [name, setName] = useState("");
//   const [birthDate, setBirthDate] = useState("");

//   const handleSavePetData = async () => {
//     try {
//       // Create an object with the data to be saved
//       const petData = {
//         petType,
//         name,
//         birthDate,
//       };

//       // Send an API POST request to your backend server
//       const response = await fetch("http://localhost:3000", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(petData),
//       });

//       const data = await response.json();
//       console.log(data.message); // Display the response message (e.g., "Pet data saved successfully!")
//     } catch (error) {
//       console.error("Error saving pet data:", error);
//     }
//   };

//   return (
//     <View>
//       {/* Your existing UI components */}
//       {/* ... */}
//       <TextInput
//         placeholder="반려동물 이름"
//         onChangeText={setName}
//         value={name}
//       />
//       <TextInput
//         placeholder="2008-07-02의 형식으로 적어주세요"
//         onChangeText={setBirthDate}
//         value={birthDate}
//       />
//       <Button title="입력 완료" onPress={handleSavePetData} />
//     </View>
//   );
// };

// export default Main;





// ai가 작성해준 코드

import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [text, setText] = useState('');

  const saveText = async () => {
    try {
      const response = await fetch('http://192.168.200.185:3000/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.status === 200) {
        Alert.alert('성공적으로 저장되었습니다.');
      } else {
        Alert.alert('데이터 저장을 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (err) {
      Alert.alert('네트워크 오류 또는 서버 문제가 발생했습니다. 다시 시도해주세요.');
      console.log('Error:', err);
    }
  };

  return (
    <View>
      <TextInput
        multiline
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setText}
        value={text}
      />
      <Button title="저장하기" onPress={saveText} />
    </View>
  );
};

export default App;
