import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
export default function Page() {
  return (
    <View>
      <Text> user tap </Text>
      <View style={{padding: 10}}></View>
      <Icon name="pluscircleo" style={{
        width: 50,
        height: 50,
        fontWeight: 'bold',
      }}></Icon>
    </View>
  );
}
