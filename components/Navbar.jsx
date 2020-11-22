import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import {Link} from "react-router-native"
import {Spring} from 'react-spring/renderprops'
export default class Navbar extends Component {
    render() {
        return (
                <Spring
                from={{ 
                    position: "absolute",
                    bottom: "2.5%",
                    backgroundColor: "#191919",
                    width: "90%",
                    height: "10%",
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                 }}
                to={{ 
                    position: "absolute",
                    bottom: this.props.navToggle ? "2.5%" : "-100%",
                    backgroundColor: "#191919",
                    width: "90%",
                    height: "10%",
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                 }}>
                {props => 
                    <View style={props}>
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
                }
            </Spring>
        )
    }
}

const styles = StyleSheet.create({
    navButtons: {
        width: 55,
        height: 55,
        opacity: 1,
      },
})
