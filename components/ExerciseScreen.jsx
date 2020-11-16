import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class ExerciseScreen extends Component {
    render() {
        return (
            <View>
                <Text> {this.props.trainingName} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})


