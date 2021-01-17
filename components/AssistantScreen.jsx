//REACT IMPORTS
import { Text, View, Platform, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

//STYLE IMPORTS
import {Spring} from 'react-spring/renderprops'
import { LinearGradient } from "expo-linear-gradient";

//NOTIFICATION MANAGEMENT
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AssistantScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
              <View style={styles.titleContainer}>
               <Text allowFontScaling={false} style={styles.title}>
                 Assistant
                </Text>
               
              </View>
              <Text style={styles.message} allowFontScaling={false}>
                  If enabled, NYA Workouts will push notifications to remind you to stay hydrated and work out. You can come back and enable / disable these options any time.
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ async () => {
                    await scheduleWater1();
                    await scheduleWater2();
                    await scheduleWater3();
                    }}>
                    <Text allowFontScaling={false} style={styles.button}>
                      Enable hydration notifications
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={async () => {
                    await scheduleTraining();
                  }}>
                    <Text allowFontScaling={false} style={styles.button}>
                      Enable training notifications
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.button}>
                      Disable all notifications
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
        )}
    </Spring>
    <LinearGradient
        // Background Linear Gradient
        pointerEvents="none"
        colors={["transparent", "black"]}
        start={{ x: 0, y: 0.9 }}
        locations={[0, 0.9]}
        style={{
          position: "absolute",
          zIndex: -1000,
          left: 0,
          right: 0,
          bottom: -100,
          height: 3500,
        }}
      />
</View>
  );
}




async function scheduleWater1() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Stay hydrated! 💧",
      body: 'Remember to drink at least 2 litters of water daily!',
    },
    trigger: { 
      hour: 9, minute: 0, repeats: true
    }
  });
}
async function scheduleWater2() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Stay hydrated! 💧",
      body: 'Remember to drink at least 2 litters of water daily!',
    },
    trigger: { 
      hour: 15, minute: 0, repeats: true
    }
  });
}
async function scheduleWater3() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Stay hydrated! 💧",
      body: 'Remember to drink at least 2 litters of water daily!',
    },
    trigger: { 
      hour: 21, minute: 0, repeats: true
    }
  });
}
async function scheduleTraining() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Work out! 🦶",
      body: 'Remember to work out at least once a day!!',
    },
    trigger: { 
      hour: 10, minute: 0, repeats: true
    }
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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

    titleContainer: {
      flexDirection: "row",
      width: Dimensions.get("window").width * 0.95,
      height: Dimensions.get("window").width * 0.15,
      position: "absolute",
      top: "0%",
      left: "5%",      
    },
    title: {
      fontSize: 40,
      color: "#D2D2D2",
      fontFamily: "Poppins_800ExtraBold_Italic",
    },
    button: {
      backgroundColor: "#191919",
      width: Dimensions.get("window").width * 0.90,
      height: Dimensions.get("window").width * 0.15,
      borderRadius: 12,
      padding: 20,
      paddingVertical: 10,
      fontSize: 15,
      margin: 5,
      color: "#D2D2D2",
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
      lineHeight: 35,
    },
    buttonContainer: {
      position: "absolute",
      bottom: "10%"
    },
    message: {
      fontFamily: "Poppins_400Regular",
      color: "#D2D2D2",
      fontSize: 18,
      position: "absolute",
      top: "15%",
      left: "5%",
      width: Dimensions.get("window").width * 0.90,
      
    }

  });
  
  