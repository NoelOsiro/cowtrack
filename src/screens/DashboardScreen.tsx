// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import TestChart from '../components/charts/PieChart';
import Header from '../components/Header';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const data = [
    {
      name: "Cows",
      population: 35,
      color: "#ff6347",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Goats",
      population: 40,
      color: "#ffbb33",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Chickens",
      population: 25,
      color: "#00bfff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <View>
    <Header />
      <Text>Farm Tracker Dashboard</Text>
      <TestChart/>
      <Text>Total Animals: 100</Text>
    </View>
  );
};

export default DashboardScreen;
