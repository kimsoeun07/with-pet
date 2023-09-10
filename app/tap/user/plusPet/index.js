import React, { useState, useEffect } from "react";
import Image from "./Image";
import { TextArea, Box, NativeBaseProvider, Radio, Text, Flex, View } from "native-base";
import { Button } from "react-native";


const Main = () => {

  const [photo, setPhoto] = useState(undefined);
  const [value, setValue] = React.useState("one");
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');

  return (
    <NativeBaseProvider>
      {/*  */}
      <View style={{ bg: "white", padding: 10, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 17 }} onPress={() => navigation.navigate("../bottomBar")}>&lt;</Text>
        <Text style={{ fontWeight: "bold", fontSize: 17, textAlign: "center", width: "100%" }}>반려동물 정보 입력</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 10 }}>
        {/* <Image url={photo} onChangePhoto={setPhoto} /> */}
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
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
          <TextArea h={10} placeholder="반려동물 이름" w="65%" maxW="300" onChangeText={value => {setName(value); console.log(name)} }/>
        </Flex>
        <br />
        <Flex direction="row" alignItems="center">
          <Text style={{ margin: 10, width: 75 }}>생년월일</Text>
          <TextArea h={10} placeholder="2008-07-02의 형식으로 적어주세요" w="65%" maxW="300" onChangeText={value => {setBirth(value); console.log(birth)}}/>
        </Flex>
      </Box>


      <Box style={{ marginTop: 30, width: "100%", alignItems: "center" }} class="bg-Teal-500">
        <Button
          onPress={() => navigation.navigate("../bottomBar")}
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

export default Main;

// const petdataModel = mongoose.model('petdata', new mongoose.Schema({
//   Username: String,
//   name: String,
//   birthday: String,
//   kind: String
//   lately_inoculation_day: Number
//   next_inoculation_day: Number
//   // 스키마 정의
//   // 여기에 해당 콜렉션의 필드를 정의합니다.
//   // 예: name, age 등
// }, { collection: 'petdata' }));
