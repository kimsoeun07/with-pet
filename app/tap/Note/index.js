// import { Link } from "expo-router";
// import { StyleSheet, Text, View } from "react-native";

// export default function Page() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.main}>
//           <Text style={styles.title}>note page</Text>
//         </View>
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       padding: 24,
//     },
//     main: {
//       flex: 1,
//       justifyContent: "center",
//       maxWidth: 960,
//       marginHorizontal: "auto",
//     },
//     title: {
//       fontSize: 64,
//       fontWeight: "bold",
//     },
//     subtitle: {
//       fontSize: 36,
//       color: "#38434D",
//     },
//   });


import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

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
    }
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  return (
    <Calendar  style={styles.calendar} 
    markedDates={markedSelectedDates}
    theme={{
      selectedDayBackgroundColor: '#009688',
      arrowColor: '#009688',
      dotColor: '#009688',
      todayTextColor: '#009688',}}
      onDayPress={(day) => {
        setSelectedDate(day.dateString)
      }} />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default CalendarView;