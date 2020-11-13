import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import {Link} from "react-router-native"

export default class Navbar extends Component {
    render() {
        return (
            <View style={styles.navContainer}>
                <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                    to="/account"
                >
                    <Image
                        style={styles.navButtons}
                        source={require("../assets/accountIcon.png")}
                    />
                </Link>
                <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                    to="/achievements"
                >
                    <Image
                        style={styles.navButtons}
                        source={require("../assets/achievementsIcon.png")}
                    />  
                </Link>
                <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                    to="/"
                >
                    <Image
                        style={styles.navButtons}
                        source={require("../assets/trainingIcon.png")}
                    />
                </Link>
                <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                    to="/assitant"
                >
                    <Image
                        style={styles.navButtons}
                        source={require("../assets/waterIcon.png")}
                    />
                </Link>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navContainer: {
        position: "absolute",
        bottom: "2.5%",
        backgroundColor: "#191919",
        width: "90%",
        height: "10%",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    navButtons: {
        width: 55,
        height: 55,
        opacity: 1,
      },
})
