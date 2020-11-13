import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {NativeRouter, Switch, Route} from "react-router-native"

//COMPONENTS IMPORT
import TrainingScreen from './TrainingScreen'
import AccountScreen from './AccountScreen'
import AssistantScreen from './AssistantScreen'
import AchievementScreen from './AchievementScreen'
import ComingSoonScreen from './ComingSoonScreen'
import Navbar from "./Navbar"

export default class Dashboard extends Component {
    render() {
        return (
            <View>
                <NativeRouter>
                    <View style={styles.dashboardContainer}>
                        <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <TrainingScreen
                                    {...props}
                                />
                            )}
                        />
                        <Route 
                            path="/account"  
                            component={ComingSoonScreen}
                        />
                        <Route 
                            path="/assitant"  
                            component={ComingSoonScreen}
                        />
                        <Route 
                            path="/achievements"  
                            component={ComingSoonScreen}
                        />
                        </Switch>
                        <Navbar/>
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
