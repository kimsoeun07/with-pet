import React, { useState } from "react";
import {Select,Box,CheckIcon,NativeBaseProvider} from "native-base";
import { Text } from "react-native";
import { MongoClient } from 'mongodb';

const Example = async () => {
  const [selectedOption, setSelectedOption] = useState("");

  const uri = 'mongodb+srv://ksoeun6204:hG5CM4TzUpDrAbXU@cluster0.1jfdc5b.mongodb.net/petmap';
  const client = new MongoClient(uri);
  const database = client.db('petmap');
  const collection = database.collection('petdata');

  try {
    await client.connect();
    console.log('MongoDB에 연결되었습니다.');

    const query={
      "Username":"user2"
    }    
    const result = await collection.find(query).toArray();
    console.log(result)


} catch (error) {
    console.error('데이터 조회 중 오류가 발생했습니다.', error);
    return json({ error: 'Internal Server Error' }, 500);
}

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
      <Box flex={1} px="3">
        <Example />
      </Box>
    </NativeBaseProvider>
  );
};
