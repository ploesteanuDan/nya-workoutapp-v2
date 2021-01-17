// @refresh reset
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Route } from "react-router-native";
import { Spring } from "react-spring/renderprops";
import { Video } from "expo-av";

//API
import axios from 'axios'
import * as FileSystem from 'expo-file-system';

export default class AccountScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
      <Spring
          from={{
            opacity: 0,
            left: "5%",
            top: "0%",
            height: "85%",
            left: "-5%",
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center', 
          }}
          to={{ 
            opacity: 1,
            height: "85%",
            top: "0%",
            left: "0%",
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
          {(mainSpring)=>(
              <View style={mainSpring}>
                <View style={styles.titleContainer}>
                 <Text allowFontScaling={false} style={styles.title}>
                   Account
                  </Text>
                 
                </View>
                <Text style={styles.message} allowFontScaling={false}>
                    The account features will soon be implemented, allowing for an easy cross platform experience.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                      <Text style={styles.button} allowFontScaling={false}>
                        Email us
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View>
          )}
      </Spring>
      <LinearGradient
          // Background Linear Gradient
          pointerEvents="none"
          colors={["transparent", "black"]}
          start={{ x: 0, y: 0.9 }}
          locations={[0, 0.9]}
          style={{
            position: "absolute",
            zIndex: -1000,
            left: 0,
            right: 0,
            bottom: -100,
            height: 3500,
          }}
        />
  </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    color: "#D2D2D2",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1D1D1D",
    width: "100%",
    height: "100%",
    },

    titleContainer: {
      flexDirection: "row",
      width: Dimensions.get("window").width * 0.95,
      height: Dimensions.get("window").width * 0.15,
      position: "absolute",
      top: "0%",
      left: "5%",      
    },
    title: {
      fontSize: 40,
      color: "#D2D2D2",
      fontFamily: "Poppins_800ExtraBold_Italic",
    },
    button: {
      backgroundColor: "#191919",
      width: Dimensions.get("window").width * 0.90,
      height: Dimensions.get("window").width * 0.15,
      borderRadius: 12,
      padding: 20,
      paddingVertical: 10,
      fontSize: 15,
      margin: 5,
      color: "#D2D2D2",
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
      lineHeight: 35,
    },
    buttonContainer: {
      position: "absolute",
      bottom: "10%"
    },
    message: {
      fontFamily: "Poppins_400Regular",
      color: "#D2D2D2",
      fontSize: 18,
      position: "absolute",
      top: "15%",
      left: "5%",
      width: Dimensions.get("window").width * 0.90,
      
    }

  });