import React, { useState } from "react";
import { WebView } from 'react-native-webview';
import { Text } from "react-native";

export default function App() {
  return (
    <>
    {/* <Text>일단 실행중!</Text> */}
    <WebView
      style={{ marginTop: 25 }}
      source={{ uri: 'https://172.30.16.13:3000/find' }}
      // https://www.google.com/
    />
    </>
  );
}