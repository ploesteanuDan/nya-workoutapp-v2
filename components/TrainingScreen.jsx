import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight, Dimensions } from 'react-native'
import {Spring} from 'react-spring/renderprops'

const db = {
}

export default class Trainings extends Component {
    render() {
        return (
            <View style={styles.trainingContainer}>
               <Spring
                    from={{
                        opacity: 0,
                        left: "-5%",
                        height: "100%",
                        left: "-5%",
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center', 
                    }}
                    to={{ 
                        opacity: 1,
                        height: "100%",
                        left: "0%",
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {(mainSpring)=>(
                        <View style={mainSpring}>
                            {/* <TouchableHighlight>
                                <View style={{
                                    width: Dimensions.get("window").width * 0.97,
                                    height: Dimensions.get("window").width * 0.97,
                                    backgroundColor: "red"
                                
                                }}>
                                    <Text>Hello</Text>
                                </View>
                            </TouchableHighlight> */}
                        </View>
                    )}
                </Spring>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    trainingContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "dodgerblue",
        width: "100%",
        height: "100%",
      },
})
