import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>With Pet</Text>
        <Link href={"/Login"} style={[styles.login]}>로그인</Link>
        <Image source={require('./img/Illustration/Workflow-Teamwork.png')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  login: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: '#0f766e',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    margin: 30,
    padding: 5,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: '#2dd4bf',
    marginTop: -50,
    textAlign: 'center',
    fontFamily: 'Jockey One',
  },
  image: {
    width: 300,
    height: 300,
  }
});