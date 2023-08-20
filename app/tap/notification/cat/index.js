import { StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider, Box } from "native-base";
import { Fab } from "native-base";

export default function Cat() {
    const [showModal, setShowModal] = useState(false);
    return (
        <NativeBaseProvider>
            <View style={{ padding: 20 }}>
                <View style={styles.container}>
                    <Text style={styles.subject}>종합{'\n'}백신</Text>
                    <View style={{ width: "70%" }}>
                        <Text style={styles.text}>추천 일정</Text>
                        <Text style={{ marginBottom: 5, fontSize: 17 }}>: 00월 00일</Text>
                        <Text style={styles.text}>최근 접종일</Text>
                        <Text style={{fontSize: 17}}>: 00월 00일</Text>
                    </View>
                    <Text style={styles.name}>반려견1</Text>
                    <Icon name="edit" style={styles.Icon} onPress={() => setShowModal(true)}></Icon>
                </View>
            </View>
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>예방접종 정보 수정</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>다음 예방접종일</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>최근 예방접종일</FormControl.Label>
                                <Input />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        flexShrink: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 163, 255, 0.40)',
        padding: 10,
        flexDirection: "row",
    },

    text: {
        fontWeight: "bold",
        float: "right"
    },

    subject: {
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        fontSize: 17,
        width: "30%"
    },

    Icon: {
        fontSize: 25,
        position: "absolute",
        right: 10
    },

    name : {
        position: "absolute",
        right: 30,
        bottom: 10
    }
})
