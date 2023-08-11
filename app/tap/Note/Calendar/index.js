import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//키보드 부분
import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';


function CalendarView() {
  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-27",
    },
  ];

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const [memo, setMemo] = useState("");

  const [memoData, setMemoData] = useState({});

  const handleMemoChange = (text) => {
    setMemo(text);
  };

  const handleSaveMemo = () => {
    setMemoData((prevMemoData) => ({
      ...prevMemoData,
      [selectedDate]: memo,
    }));
  };

  const selectedDateMemo = memoData[selectedDate] || "";

  const markedWithMemoDates = Object.keys(memoData).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          markedDates={{
            ...markedDates,
            ...markedWithMemoDates,
            [selectedDate]: {
              selected: true,
              marked: markedDates[selectedDate]?.marked,
              dotColor: 'blue',
            },
          }}
          theme={{
            selectedDayBackgroundColor: "#009688",
            arrowColor: "#009688",
            dotColor: "#009688",
            todayTextColor: "#009688",
          }}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />

        <View style={styles.memoContainer}>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
          <TextInput
            style={styles.memoInput}
            multiline
            placeholder="메모를 입력하세요..."
            value={selectedDateMemo}
            onChangeText={handleMemoChange}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveMemo}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>

          <Icon name="pluscircle" size={30} color="black" style={styles.Icon}></Icon>
        </View>
      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  memoContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: "#009688",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  Icon: {
    position: "absolute",
    right: 0
  }
});

export default CalendarView;
