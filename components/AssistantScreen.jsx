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

export default class AssistantScreen extends Component {

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
        {(mainSpring) => (
            <View style={mainSpring}>       
                <Text style={styles.title}>
                 Assistant
                 {"\n"}
                 Coming soon!
                </Text>
            </View>
        )}
      </Spring>
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
  exContainer: {
    top: "7%",
    left: "2.5%",
    height: "95%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 45,
    color: "#D2D2D2",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
  },
  backButton:{
    width: 45,
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20
  },
  exCard: {
    backgroundColor: "#1D1D1D",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.665,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#191919",
    overflow: "hidden",
  },
  exPhoto: {
    width: "100%",
    height: "100%",
  },

  exReps: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  exName: {
    position: "absolute",
    top: 10,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  exDone: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 9000
  },
  finishScreenText: {
    top: "45%",
    fontSize: 40,
    color: "#D2D2D2",
    fontFamily: "Poppins_800ExtraBold_Italic",
    alignSelf: "center",
    textAlign: "center",
  },
  finishScreenSubtext: {
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
    color: "#D2D2D2",
    alignSelf: "center",
    textAlign: "center",
  },

  
});
