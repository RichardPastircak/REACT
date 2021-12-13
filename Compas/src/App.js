import React, { useEffect, useState } from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import RNSimpleCompass from 'react-native-simple-compass';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


export default function App () {
  const [degree, setDegree] = useState(0)
  const degree_update_rate = 1;

  useEffect(() => {
    RNSimpleCompass.start(degree_update_rate, (degre) => {
      setDegree(degre)
    });

    return () => {
      RNSimpleCompass.stop()
    }
  },[])


  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.text1}>COMPASS</Text>
      </View>
      <Image source={require("./assets/compass.png")} style={{flex: 8, width: null, height: null, resizeMode: 'contain', transform: [{rotate: `${360-degree}deg`}]}}/>
      <Text style={styles.text}>{degree}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  heading: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    color: "black",
    fontSize: 60,
    textAlign: "center",
    marginBottom: "5%",
  },
  text1: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  }
});
