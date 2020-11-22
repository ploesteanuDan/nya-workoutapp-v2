import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class AccountScreen extends Component {

    

    render() {
        return (
            <View>
               <TouchableOpacity>
                   <Text>
                       Clear cache
                   </Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
