import React from "react";
import { WebView } from 'react-native-webview';

export default function App() {


  return (
    <>
      <WebView
        style={{ marginTop: 25 }}
        source={{ uri: 'https://petmap-ten.vercel.app/find' }}

        ref={ref => {
          this.webview = ref;
        }}
        javaScriptEnabledAndroid={true}
      // injectedJavaScript={location}
      // injectedJavaScript={injectedJavaScript}

      />
    </>
  );
}