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

export default class ExercisesScreen extends Component {
  state = {
   exercises: null,
   exercisesDone: 0,
   achievementString: [],
   exerciseList: []
  };
    
  async getExStatus(item){
    item.done = true;
    await this.setState({exercisesDone: this.state.exercisesDone + 1})
    if(this.state.exercisesDone >= this.state.exerciseList.length){
        console.log("training finished")
        this.setState({trainingFinished: true})
    }
  }

  componentDidMount(){
    this.props.handleNavToggle(false)
    axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings/" + this.props.training._id)
    .then(
        res => {
            console.log(res.data.data.training.name)
            this.setState({exerciseList: res.data.data.training.exercises})
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
  }



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
            <Link
              component={TouchableOpacity}
              activeOpacity={0.5}
              onPress={()=>{this.props.handleReturn()}}
            >
              <View style={styles.titleContainer}>
                <Image style={styles.backButton} source={require("../assets/backButton.png")}/>
                <Text style={styles.title} allowFontScaling={false}>
                  {this.props.training.name}
                </Text>
              </View>
            </Link>
            <FlatList
                keyExtractor={(item, id) => id.toString()}
                data={this.state.exerciseList}
                renderItem={({ item }) => (
                

                <Spring
                 from={{ opacity: 0 }}
                  to={{ 
                  opacity: 1,
                  backgroundColor: "#1D1D1D",
                  width: Dimensions.get("window").width * 0.95,
                  height: Dimensions.get("window").width * 0.665,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 12,
                  backgroundColor: "#191919",
                  overflow: "hidden", }}>
                {cardProps => 
                
                <View style={cardProps}>
                <Link
                  component={TouchableHighlight}
                  activeOpacity={0.85}
                  onPress={()=>{item.pressed = !item.pressed}}
                >
                  <View>
                    <Video
                      source={{uri: FileSystem.documentDirectory + item.vid}}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      resizeMode="cover"
                      shouldPlay={item.pressed}
                      isLooping={false}
                      style={styles.exPhoto}
                    />
                    <Text style={styles.exName}allowFontScaling={false}>{item.name}</Text>
                    <Text style={styles.exReps}allowFontScaling={false}>
                      {item.reps}
                      {" REPS"}
                    </Text>

                  </View>
                </Link>
                <View pointerEvents={item.done ? "none" : "auto"}>  

                <Spring
                    to={{  
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    fontFamily: "Poppins_600SemiBold_Italic",
                    fontSize: 15,
                    color: item.done ? "#191919": "#D2D2D2",
                    backgroundColor: item.done ? "#50d6d3" : "#191919",
                    padding: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    zIndex: 9000, }}>
                    {doneButtonProps =>                           
                  <Text          
                  onPress={()=>{this.getExStatus(item)}} 
                  allowFontScaling={false}
                  style={doneButtonProps}
                          >
                            Done
                          </Text>}
                </Spring>


                    
                    </View>
              </View>
                
                }
                </Spring>
              )}
            />
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
      <Spring
        from={{ opacity: 0 }}
        to={{ 
          opacity: this.state.trainingFinished ?  1 : 0, 
          width: "100%",
          height: this.state.trainingFinished ? "100%" : "0%",
          backgroundColor: "black",
          top: 0,
          position: "absolute"
        }}>
          {finishScreenProps => 
            <View style={finishScreenProps}>
              <Text 
                style={styles.finishScreenText}
                allowFontScaling={false}
              >
                Training finished!
              </Text>
              <Spring
                from={{ opacity: 0 }}
                to={{ 
                  opacity: 1,
                  alignSelf: "center",
                  textAlign: "center",
                  top: "50%"
                   }}>
                {finishButtonProps => 
                 <View style={finishButtonProps}>
                            <Link
              component={TouchableHighlight}
              activeOpacity={0.5}
              onPress={() => {
                this.props.handleReturn();
              }}
              to="/"
            >
              <Text 
                style={styles.finishScreenSubtext} 
                allowFontScaling={false}  
              >
                Go to Dashboard
              </Text>
            </Link>
                 </View> 
                }
              </Spring>
            </View>
          }
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
    width: 35,
    height: 35,
    marginTop: 10,
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
    fontSize: 15,
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
    fontSize: 15,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
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
