import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {NativeRouter, Switch, Route} from "react-router-native"

//COMPONENTS IMPORT
import TrainingScreen from './TrainingScreen'
import AccountScreen from './AccountScreen'
import AssistantScreen from './AssistantScreen'
import AchievementScreen from './AchievementScreen'
import Navbar from "./Navbar"

export default class Dashboard extends Component {

    state = {
        navToggle: true
    }

    handleNavToggle(navToggle){
        this.setState({
            navToggle: navToggle
        })
    }

    render() {
        return (
            <View style={styles.dashboardContainer}>
                <NativeRouter  >
                    <View style={styles.dashboardContainer}>
                        <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <TrainingScreen
                                    {...props}
                                    handleNavToggle={this.handleNavToggle.bind(this)}
                                />
                            )}
                        />
                        <Route 
                            path="/account"  
                            component={AccountScreen}
                        />
                        <Route 
                            path="/assitant"  
                            component={AssistantScreen}
                        />
                        <Route 
                            path="/achievements"  
                            component={AchievementScreen}
                        />
                        </Switch>
                        <Navbar navToggle={this.state.navToggle}/>
                    </View>
                </NativeRouter>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dashboardContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "dodgerblue",
      width: "100%",
      height: "100%",
    },
  });
