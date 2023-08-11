import React from "react";
import { View, Text, Pressable } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export default function Page() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("PlusPet"); // 라우트 이름으로 이동
  };

  return (
    <NativeBaseProvider>
      <View>
        <Text>프로필</Text>
        <View style={{ padding: 10 }}></View>
        <Icon
          name="pluscircleo"
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "black", 
            position: "absolute", 
            bottom: -450, 
            right: 20
          }}
          onPress={()=> navigation.navigate("./tap/bottomBar")}
        />
      </View>
    </NativeBaseProvider>
  );
}