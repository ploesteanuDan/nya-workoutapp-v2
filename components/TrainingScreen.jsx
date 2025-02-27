//REACT NATIVE IMPORTS
import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import { Link } from "react-router-native";

//STYLE IMPORTS
import { Spring } from 'react-spring/renderprops'
import { LinearGradient } from "expo-linear-gradient";

//API
import axios from 'axios'
import * as FileSystem from 'expo-file-system';

import ExerciseScreen from './ExerciseScreen'

const searchArrays = require('../assets/searchArrays')

export default class TrainingScreen extends Component {

    state = {
        trainings: [],
        exForFetch: [],
        currentTraining: []
    }

    handleSearch(text){
        text = text.toLowerCase()
        for(let i = 0; i < searchArrays.searchArrays.length; i++)
        {
            if(searchArrays.searchArrays[i].includes(text))
        {
        axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings?mainFocus=" + searchArrays.searchArrays[i][0])
        .then(res => {
            this.setState({
                trainings: res.data.data.trainings
            })
        })
        }
        }
        if(text==""){
            axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings")
            .then(res => {
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
    }


    handleReturn(){
        this.setState({fetchWasSucc: false, itemLoading: null})
        this.props.handleNavToggle(true)
    }

    handleClearCache(){
        FileSystem.deleteAsync(FileSystem.documentDirectory + "vid3.mp4")
        .then(
            console.log("Deleted")
        )
        .catch(err => {
            console.log(err)
        })
        FileSystem.deleteAsync(FileSystem.documentDirectory + "v1.mp4")
        .then(
            console.log("Deleted")
        )
        .catch(err => {
            console.log(err)
        })
        FileSystem.deleteAsync(FileSystem.documentDirectory + "v2.mp4")
        .then(
            console.log("Deleted")
        )
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getTr()
    }

    async getTr(){
        const sendGetRequest = async () => {
            try {
                const resp = await axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings/")
                this.setState({trainings: resp.data.data.trainings})
            } catch (err) {
                console.log(err)
            }
        }

        await sendGetRequest();

        for(let i = 0; i < this.state.trainings.length; i++){
            const imageInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + this.state.trainings[i].imgName)
            if(!imageInfo.exists){
                const downloadResumable = FileSystem.createDownloadResumable(
                    this.state.trainings[i].imgLink,
                    FileSystem.documentDirectory + this.state.trainings[i].imgName,
                    {}
                )

                try {
                    const {uri} = await downloadResumable.downloadAsync();
                    console.log("Finished downloading to ", uri)
                } catch (err) {
                    console.log(err)
                } finally {
                    if (!err.exists){
                        console.log("Get request finalized with no errors.")
                    }
                }
            }
        }
    }

    async getEx(item){

        const sendGetRequest = async () => {
            try {
                const resp = await axios.get("https://nya-api.herokuapp.com/nya/api/v1/trainings/" + item._id);
                this.setState({currentTraining: resp.data.data.training})
            } catch (err) {
                console.error(err);
            }
        };
        
       await sendGetRequest();

        for(let i = 0; i < item.exercises.length; i++)
        {   
            const videoInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + this.state.currentTraining.exercises[i].vidName)
            if (!videoInfo.exists)
            {   
                this.setState({
                    itemLoading: item.name
                })

                const callback = downloadProgress => {
                    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                    this.setState({
                      downloadProgress: Dimensions.get("window").width * progress.toFixed(3) * 0.9,
                    });
                    console.log(progress)
                  };

                const downloadResumable = FileSystem.createDownloadResumable(
                    this.state.currentTraining.exercises[i].vidLink,
                    FileSystem.documentDirectory + this.state.currentTraining.exercises[i].vidName,
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
                    if(i == item.exercises.length - 1){
                        this.setState({
                            fetchWasSucc: true,
                            training: item,
                        })
                    }
                }
            }
            else {
                console.log("video ", item.exercises[i].vidName, " already downloaded")
                if(i == item.exercises.length - 1){
                    this.setState({
                        fetchWasSucc: true,
                        training: item,
                    })
                }

            }

        }

        

    }

    render() {
        if (this.state.fetchWasSucc){
            return <ExerciseScreen 
                        handleReturn={this.handleReturn.bind(this)}
                        training={this.state.training} 
                        handleNavToggle={this.props.handleNavToggle}
                    />
        }
        else 
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
                        <TextInput 
                            style={styles.searchButton} 
                            onChangeText={(text)=>{this.handleSearch(text)}}
                            placeholder="Search" 
                            placeholderTextColor={"#D2D2D2"}
                            allowFontScaling={false}
                        />
                        <ScrollView>
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
                                                source={{uri: FileSystem.documentDirectory + item.imgName }}
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
                                            <View style={styles.loadingContainer}>
                                                <Spring
                                                    from={{ 
                                                        backgroundColor: "#D2D2D2",
                                                        height: Dimensions.get("window").width * 0.05,
                                                        width: Dimensions.get("window").width * 0,
                                                        borderRadius: 10,
                                                        opacity: 0
                                                     }}
                                                    to={{ 
                                                        opacity: this.state.itemLoading == item.name ? 1 : 0,
                                                        backgroundColor: "#D2D2D2",
                                                        height: Dimensions.get("window").width * 0.05,
                                                        width: this.state.downloadProgress,
                                                        borderRadius: 10
                                                     }}>
                                                    {props => <Image style={props}/>}
                                                </Spring>
                                            </View>
                                            <Text style={styles.trainingName} allowFontScaling={false} >
                                                {item.name}
                                            </Text>
                                            <View style={styles.trainingPacketsAtributesContainer}>
                                                <View style={styles.trainingPacketsAtributes}>
                                                    <Text style={styles.trainingPacketsAtributesName} allowFontScaling={false}>
                                                        Intensity
                                                    </Text>
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
                                                    <Text style={styles.trainingPacketsAtributesName} allowFontScaling={false}>
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
                         <Text
                            style={styles.noMoreCards} allowFontScaling={false}
                        >
                            No more workouts available right now.{"\n"} Stay tunned for more.
                        </Text>
                        {/* <TouchableOpacity>
                            <Text style={styles.clearCacheButton} onPress={()=>{this.handleClearCache()}}>
                                Clear cache
                            </Text>
                        </TouchableOpacity> */}
                        </ScrollView>
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
        fontSize: 40,
        position: "absolute",
        bottom: "30%",
        left: "5%",
        fontFamily: "Poppins_800ExtraBold_Italic",
        lineHeight: 60,
    },
    trainingPacketsBg: {
        width: "100%",
        height: "100%",
    },
    searchButton: {
        backgroundColor: "#191919",
        width: Dimensions.get("window").width * 0.95,
        height: Dimensions.get("window").width * 0.15,
        borderRadius: 12,
        padding: 20,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 10,
        color: "#D2D2D2",
        fontFamily: "Poppins_400Regular",
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
        justifyContent: "center"
      },
      trainingPacketsAtributesName: {
        fontSize: 20,
        color: "#D2D2D2",
        marginRight: 10,
        marginLeft: 10,
        fontFamily: "Poppins_400Regular",
      },
      valueOrb: {
        width: 13,
        height: 13,
        borderRadius: 12,
        backgroundColor: "#D2D2D2",
        marginTop: 9,
        marginLeft: 2,
        marginRight: 2,
      },
      noValueOrb: {
        marginTop: 9,
        marginLeft: 2,
        marginRight: 2,
        width: 13,
        height: 13,
        borderRadius: 12,
        backgroundColor: "#D2D2D2",
        opacity: 0.5,
      },
      clearCacheButton: {
          marginBottom: "25%",
          marginTop: "5%",
          alignSelf: "center",
          textAlign: "center",
          backgroundColor: "#191919",
          width: Dimensions.get("window").width * 0.95,
          height: Dimensions.get("window").width * 0.20,
          borderRadius: 12,
          lineHeight: Dimensions.get("window").width * 0.25,
          fontSize: 20,
          fontFamily: "Poppins_400Regular",
          color: "#D2D2D2",
      },
      loadingContainer:{
        position: "absolute",
        flexDirection: "row",
        bottom: "2.5%",
        left: "2.5%"
      },

      loading: {
        width: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").width * 0.05,
        backgroundColor: "#D2D2D2",
        margin: Dimensions.get("window").width * 0.03,
        borderRadius: 300
      },
      noMoreCards: {
          textAlign: "center",
          color: "#D2D2D2",
          fontFamily: "Poppins_400Regular",
          marginBottom: "15%",
          width: Dimensions.get("window").width * 0.95,
      }
})

