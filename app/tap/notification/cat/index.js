import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from 'expo-router';
import { Center } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Cat() {
    return (
        <View>
            <Text>cat</Text>
            <View style={{padding: 20}}>
                <View style={{
                    width: 150,
                    height: 190,
                    flexShrink: 0,
                    borderRadius: 30,
                    background: 'rgba(0, 163, 255, 0.40)',
                    padding: 10
                }}>
                    <Text style={styles.subject}>종합백신</Text>
                    <Text style={styles.text}>추천 일정</Text>
                    <Text>: 00월 00일</Text>
                    <br></br>
                    <Text style={styles.text}>최근 접종일</Text>
                    <Text>: 00월 00일</Text>
                    <Icon name="edit" style={styles.Icon}></Icon>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        float: "right"
    },

    subject: {
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        fontSize: 17
    },
    
    Icon: {
        fontSize: 25,
        textAlign: "right",
    }
})