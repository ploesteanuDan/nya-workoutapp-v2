import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//COMPONENTS IMPORT
import DashboardScreen from "./components/DashboardScreen"

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <DashboardScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#D2D2D2",
    width: "100%",
    height: "100%",
  },
});
