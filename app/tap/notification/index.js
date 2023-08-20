import React, { useState } from "react";
import {
  Select,
  Box,
  CheckIcon,
  NativeBaseProvider,
} from "native-base";
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
      <Box flex={1} px="3">
        <Example />
      </Box>
    </NativeBaseProvider>
  );
};
