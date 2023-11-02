import React, { useState, useRef, useEffect } from "react";
import { WebView } from 'react-native-webview';
import { Text, PermissionsAndroid, TouchableOpacity, Button } from "react-native";
import * as Location from 'expo-location';
import { View } from "native-base";


export default function App() {
  const webViewRef = useRef();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions")
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:")
      console.log(currentLocation)
    };
    getPermissions();
    // webViewRef.current.postMessage(location)
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // useEffect(() => {
  //   if (location) {
  // const injectedJavaScript = `
  //       window.postMessage(JSON.stringify(${JSON.stringify(location)}));
  //     `;
  //     webViewRef.current?.injectJavaScript(injectedJavaScript);
  //   }
  // }, [location]);

//   const injectedJavaScript = `
//   window.webLocation = ${text};
//   true; // note: this is important, or you'll sometimes get silent failures
// `;


useEffect(() => {
  if (location) {
    const message = JSON.stringify(location);
    webViewRef.current?.postMessage(message);
  }
}, [location]);


  return (
    <>
      <WebView
        style={{ marginTop: 25 }}
        source={{ uri: 'https://petmap-ten.vercel.app/find' }}

        ref={ref => {
          this.webview = ref;
        }}
        // javaScriptEnabledAndroid={true}
        // injectedJavaScript={location}
        // injectedJavaScript={injectedJavaScript}

      />
    </>
  );
}