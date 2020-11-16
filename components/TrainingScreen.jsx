//REACT NATIVE IMPORTS
import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput} from 'react-native'
import { Link } from "react-router-native";

//STYLE IMPORTS
import {Spring} from 'react-spring/renderprops'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

//API
import axios from 'axios'
import * as FileSystem from 'expo-file-system';

export default class TrainingScreen extends Component {

    state = {
        trainings: [],
        exForFetch: [],
        fetchWasSucc: false
    }

    componentDidMount(){
        axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings")
        .then(res => {
            resData = res.data
            this.setState({
                trainings: res.data.data.trainings,
            })
            // console.log("state-------------------------------------------------------------")
            // console.log(this.state.trainings);
        })
        .catch(err => {
            console.log(err);
        })
    }

   async getEx(item){
        console.log(item.exercises)
        this.setState({exForFetch: item.exercises})
        for(let i = 0; i < item.exercises.length; i++)
        {
            const videoInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + item.exercises[i].vid)
            if (!videoInfo.exists)
            {   
                const callback = downloadProgrerss => {
                    const progress = downloadProgrerss.totalBytesWritten / downloadProgrerss.totalBytesExpectedToWwrite
                    // console.log(progress)
                }
                console.log(item.exercises[i].vid)
                const downloadResumable = FileSystem.createDownloadResumable(
                    'https://nya-api.herokuapp.com/nya/api/v1/media/' + item.exercises[i].vid,
                    FileSystem.documentDirectory + item.exercises[i].vid,
                    {},
                    callback
                )
    
                try {
                    const {uri} = await downloadResumable.downloadAsync();
                    console.log("Finished downloading to ", uri)
                } catch (e) {
                    console.log(e)
                } finally {
                    console.log("----------------------------------------------")
                    console.log("get request finalized")
                    this.setState({fetchWasSucc: true})

                }
            }
            else {
                console.log("video ", item.exercises[i].vid, " already downloaded")
            }

        }
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
                {(mainSpring)=>(
                    <View style={mainSpring}>
                        <TextInput style={styles.searchButton} placeholder="Search" />
                        <FlatList
                            data={this.state.trainings}
                            keyExtractor={(item, id) => id.toString()}
                            renderItem={({item})=>(
                                <View style={styles.trainingCard}>
                                    <Link
                                        component={TouchableOpacity}
                                        activeOpacity={0.5}
                                        onPress={()=>{this.getEx(item)}}
                                        to={this.state.fetchWasSucc ? "/exercises" : "/"}
                                    >
                                        <View style={{width: "100%", height: "100%",}}>
                                            <Image
                                                style={styles.trainingPacketsBg}
                                                source={{uri: "https://nya-api.herokuapp.com/nya/api/v1/media/" + item.img }}
                                            />
                                            <LinearGradient
                                            colors={["transparent", item.color]}
                                            start={{ x: 0, y: 0.9 }}
                                            end={{ x: 0, y: 1 }}
                                            locations={[0, 1]}
                                            style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            height: 2500,
                                            }}
                                            />
                                            <Text style={styles.trainingName} >
                                                {item.name}
                                            </Text>
                                            <View style={styles.trainingPacketsAtributesContainer}>
                                                <View style={styles.trainingPacketsAtributes}>
                                                    <Text style={styles.trainingPacketsAtributesName}>
                                                    Intensity
                                                    </Text>
                                                    <Text
                                                    style={styles.trainingPacketsAtributesValue}
                                                    ></Text>
                                                    <Image
                                                    style={
                                                        item.intensity > 0
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                    <Image
                                                    style={
                                                        item.intensity  > 1
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                    <Image
                                                    style={
                                                        item.intensity  > 2
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                </View>
                                                <View style={styles.trainingPacketsAtributes}>
                                                    <Text style={styles.trainingPacketsAtributesName}>
                                                    Duration
                                                    </Text>

                                                    <Image
                                                    style={
                                                        item.duration > 0
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                    <Image
                                                    style={
                                                        item.duration > 1
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                    <Image
                                                    style={
                                                        item.duration > 2
                                                        ? styles.valueOrb
                                                        : styles.noValueOrb
                                                    }
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </Link>
                                </View>
                            )}
                        />
                        <LinearGradient
                            pointerEvents="none"
                            colors={["transparent", "black"]}
                            start={{ x: 0, y: 0.1 }}
                            locations={[0, 0.5]}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: "-25%",
                                height: "50%",
                            }}
                        />
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
    trainingCard: {
        backgroundColor: "#1D1D1D",
        width: Dimensions.get("window").width * 0.95,
        height: Dimensions.get("window").width * 0.95,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 12,
        overflow: "hidden",
    },
    trainingName: {
        color: "#D2D2D2",
        fontSize: 50,
        position: "absolute",
        bottom: "30%",
        left: "5%",
        // fontFamily: "Poppins_800ExtraBold_Italic",
        lineHeight: 60,
    },
    trainingPacketsBg: {
        width: "100%",
        height: "100%",
    },
    searchButton: {
        backgroundColor: "#191919",
        width: "95%",
        height: 60,
        borderRadius: 12,
        padding: 20,
        paddingVertical: 10,
        fontSize: 20,
        marginBottom: 10,
        color: "#D2D2D2",
        // fontFamily: "Poppins_400Regular",
      },
      trainingPacketsAtributes: {
        color: "#D2D2D2",
        flexDirection: "row",
      },
      trainingPacketsAtributesContainer: {
        position: "absolute",
        bottom: "20%",
        left: "2%",
        flexDirection: "row",
      },
      trainingPacketsAtributesName: {
        fontSize: 20,
        color: "#D2D2D2",
        marginRight: 10,
        marginLeft: 10,
        // fontFamily: "Poppins_400Regular",
      },
      valueOrb: {
        width: 13,
        height: 13,
        borderRadius: 12,
        backgroundColor: "#D2D2D2",
        margin: 6,
        marginLeft: 2,
        marginRight: 2,
      },
      noValueOrb: {
        margin: 6,
        marginLeft: 2,
        marginRight: 2,
        width: 13,
        height: 13,
        borderRadius: 12,
        backgroundColor: "#D2D2D2",
        opacity: 0.5,
      },
      
})
