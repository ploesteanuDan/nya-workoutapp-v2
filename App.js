import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//COMPONENTS IMPORT
import DashboardScreen from "./components/DashboardScreen"

//IMPORT FONTS
import {
  useFonts,
  Poppins_800ExtraBold_Italic,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from "@expo-google-fonts/poppins";

export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_800ExtraBold_Italic,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
  });

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
