import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Spring} from 'react-spring/renderprops'

export default class ComingSoonScreen extends Component {
    render() {
        return (
            <View>
                <Spring
                    from={{
                        opacity: 0,
                        left: "2.5%",
                        height: "100%",
                        left: "-5%",
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center', 
                    }}
                    to={{ 
                        opacity: 1,
                        height: "100%",
                        left: "2.5%",
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {(mainSpring)=>(
                        <View style={mainSpring}>
                            <Text> Coming Soon </Text>
                        </View>
                    )}
                </Spring>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
