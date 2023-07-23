import React from "react";

import { StyleSheet, Text, View, Button } from "react-native";
// import { Button, Container } from "native-base";

function App() {
  return (
  <View style={styles.container}>
      <View style={styles.header}>
        {'상단내용'}
      </View>
      <View style={styles.content}>
        {'중앙내용'}
      </View>
      <View style={styles.footer}>
        <View style={styles["bottom-tab"]}>
          <Button style={styles["tab-button"]}>Tab 1</Button>
          <Button style={styles["tab-button"]}>Tab 2</Button>
          <Button style={styles["tab-button"]}>Tab 3</Button>
        </View>
      </View>
    </View>
  );

}

export default App;

  const styles = StyleSheet.create({
    container : {
      display: flex,
      flexDirection: column,
      minHeight: '100vh',
    },
    
    header : {
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      height: '60px',
      /* 상단 헤더 스타일 */
    },
    
    content : {
      /* 중앙 내용 스타일 */
      flexGrow: 1,
    },
    
    footer : {
      /* 하단 푸터 스타일 */
      backgroundColor: '#f1f1f1',
      padding: '10px',
    },
    
    bottomTab : {
      display: flex,
      justifyContent: center,
    },
    
    tabButton : {
      margin: '0 5px',
      padding: '5px 10px',
      backgroundColor: '#e0e0e0',
      border: none,
      borderRadius: '4px',
      cursor: pointer,
    },
  });
// .tab-button:hover {
  // background-color: #ccc;
// }
