import React, { useState } from "react";
import {Select,Box,CheckIcon,NativeBaseProvider} from "native-base";
import { Text } from "react-native";

const Example = () => {
  const [selectedOption, setSelectedOption] = useState("");

  function SearchScreen() {
    return <Text>Search</Text>;
  }

  return (
    <Box maxW="300">
      <Select
        value={selectedOption}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="반려동물 선택"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
      {selectedOption === "ux" && <SearchScreen />}
    </Box>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Box flex={1} px="3" >
        <Example />
      </Box>
    </NativeBaseProvider>
  );
};

//Mongodb연결해서 현재 사용자 아이디를 가진 petdata불러와서 그 각 petdata속성 중 이름으로 Select.Item 생성하기. 
// label="petdata name" value="petdata name"
// 그 갯수에 맞게 petdata name으로 함수 생성
// 각 함수 안에는 cat파일에 있는 예방접종 카드들 생성. 
// 고양이 인지, 강아지 인지에 따라 각각 다른 예방접종이 쓰여있는 카드들 받아오기(cat, dog파일에 만들어 두고 가져오면 될 듯!)

//여기까지 하면 UI완성. 이제 기능은 어떻게 하냐.
// 사용자가 모달 클릭해서 입력하게 한 후에 그걸 예방접종 카드에 보이도록 업데이트 하시고
// 추천일정에 쓰여진 날짜가 오늘이 되면 푸시 알림 보내기(반려동물 이름/ 접종 할 예방접종 이름)