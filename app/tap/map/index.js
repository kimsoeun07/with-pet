import React, { useState } from "react";
import { WebView } from 'react-native-webview';
import { Text } from "react-native";

export default function App() {
  return (
    <>
    <Text>일단 실행중</Text>
    <WebView
      style={{ width: 200, height: 200 }}
      source={{ uri: 'http://172.30.1.77:3000/find' }}
    />
    </>
  );
}