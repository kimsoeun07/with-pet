import React, { useState } from "react";
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      style={{ width: 200, height: 200 }}
      source={{ uri: 'https://localhost:3000/find' }}
    />
  );
}