import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WeekTab = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prevWeekStart) => {
      const previousWeek = new Date(prevWeekStart);
      previousWeek.setDate(prevWeekStart.getDate() - 7);
      return previousWeek;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prevWeekStart) => {
      const nextWeek = new Date(prevWeekStart);
      nextWeek.setDate(prevWeekStart.getDate() + 7);
      return nextWeek;
    });
  };

  const formatDate = (date) => {
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0')
    );
  };

  const weekStart = new Date(currentWeekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <View style={styles.base}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePreviousWeek}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.tabText}>
          {formatDate(weekStart)} ~ {formatDate(weekEnd)}
        </Text>
        <TouchableOpacity onPress={handleNextWeek}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.walkBox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 10
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  walkBox: {
    borderRadius: 35,
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "300%",
    flexShrink: 0,
  }
});

export default WeekTab;
