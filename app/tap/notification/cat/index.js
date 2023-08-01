import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from 'expo-router';
import { Center } from "native-base";

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
                    background: 'rgba(0, 163, 255, 0.40)'
                }}>
                    <Text style={{textAlign: 'Center', padding: 10}}>종합백신</Text>
                </View>
            </View>
        </View >
    );
}