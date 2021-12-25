import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking, Image, View, SafeAreaView, Button, Pressable
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import { request } from "react-native-permissions";

import { AddDrink } from "./addDrink.js";
import { ItemsProvider} from "./reduxstuff.js";
import { useItems} from "./reduxstuff.js";
import { useEffect } from "react";


//const [dailyWater, setDaylyWater] = React.useState(1500);
//const [waterDrank, setWaterDrank] = React.useState(0);


//const drinkUp = (amounth) => {
  //React.setWaterDrank = (waterDrank + 100);
  //console.log(waterDrank);
//}

function Home ({route, navigation}){
  const [water,setWater] = React.useState(0);
  const [mainPicture, setMainPicture] = React.useState(require("./assets/mainpicture/level0.png"));
  const [items, setItems] = useItems();

  const firstDrink = (route.params in window) ? require("./assets/glass.png") : items[0]["firstPicture"];

  const drink = (waterDrinked) => {
    setWater(water+waterDrinked);
    let percentage = (water+waterDrinked)/2000*100;


    if(percentage <5){
      setMainPicture(require("./assets/mainpicture/level0.png"));
    }
    else if(percentage <10){
      setMainPicture(require("./assets/mainpicture/level5.png"));
    }
    else if(percentage <15){
      setMainPicture(require("./assets/mainpicture/level10.png"));
    }
    else if(percentage <20){
      setMainPicture(require("./assets/mainpicture/level15.png"));
    }
    else if(percentage <25){
      setMainPicture(require("./assets/mainpicture/level20.png"));
    }
    else if(percentage <30){
      setMainPicture(require("./assets/mainpicture/level25.png"));
    }
    else if(percentage <35){
      setMainPicture(require("./assets/mainpicture/level30.png"));
    }
    else if(percentage <40){
      setMainPicture(require("./assets/mainpicture/level35.png"));
    }
    else if(percentage <45){
      setMainPicture(require("./assets/mainpicture/level40.png"));
    }
    else if(percentage <50){
      setMainPicture(require("./assets/mainpicture/level45.png"));
    }
    else if(percentage <55){
      setMainPicture(require("./assets/mainpicture/level50.png"));
    }
    else if(percentage <60){
      setMainPicture(require("./assets/mainpicture/level55.png"));
    }
    else if(percentage <65){
      setMainPicture(require("./assets/mainpicture/level60.png"));
    }
    else if(percentage <70){
      setMainPicture(require("./assets/mainpicture/level65.png"));
    }
    else if(percentage <75){
      setMainPicture(require("./assets/mainpicture/level70.png"));
    }
    else if(percentage <80){
      setMainPicture(require("./assets/mainpicture/level75.png"));
    }
    else if(percentage <85){
      setMainPicture(require("./assets/mainpicture/level80.png"));
    }
    else if(percentage <90){
      setMainPicture(require("./assets/mainpicture/level85.png"));
    }
    else if(percentage <95){
      setMainPicture(require("./assets/mainpicture/level90.png"));
    }
    else if(percentage <100){
      setMainPicture(require("./assets/mainpicture/level95.png"));
    }
    else{
      setMainPicture(require("./assets/mainpicture/level100.png"));
    }


  }

  return(
    <SafeAreaView style={styles.screen}>
      <Pressable style={styles.main_cogwheel} onPress={() => {
        navigation.navigate('Settings')}
      }>
        <Image source={require('./assets/cogwheel.png')} style={styles.image}></Image>
      </Pressable>

      <View style={styles.main_image}>
        <Image source={mainPicture}></Image>
        <Text style={styles.water_amount}>{water} ml</Text>
      </View>
      <View style={styles.main_drinks}>

        <Pressable style={{flex: 1}} onPress={() => navigation.navigate('AddDrink')}>
          <Image source={require("./assets/add_drink.png")} style={styles.image}/>
        </Pressable>
        <Pressable style={{flex: 1}} onPress={() => drink(100)}>
          <Image source={firstDrink} style={styles.image}/>
        </Pressable>
        <Pressable style={{flex: 1}}>
          <Image source={require('./assets/glass.png')} style={styles.image}/>
        </Pressable>
        <Pressable style={{flex: 1}}>
          <Image source={require('./assets/glass.png')} style={styles.image}/>
        </Pressable>
        <Pressable style={{flex: 1}}>
          <Image source={require('./assets/glass.png')} style={styles.image}/>
        </Pressable>

      </View>

      <View style={styles.main_text_box}>
      <Text style={styles.main_text}>Tired of drinking just a water? Find inspiration online!</Text>
      </View>

      <View style={styles.main_button_area}>
        <TouchableOpacity style={styles.main_button} onPress={() => navigation.navigate('Api')}>
          <Text style={{color: "white"}}>API</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


function Settings ({navigation}) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>screen COG WHEEL</Text>
        <Button title={'Back to main screen'} onPress={() => navigation.navigate('Home')}/>
      </SafeAreaView>
    )
  }

function Api ({navigation}) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>screen API</Text>
      <Button title={'Back to main screen'} onPress={() => navigation.navigate('Home')}/>
    </SafeAreaView>
  )
}


const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <ItemsProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AddDrink" component={AddDrink}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Api" component={Api}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ItemsProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },

  main_image: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99d8ea',

  },
  water_amount: {
    fontSize: 25,
    fontFamily: 'serif',
    color: 'darkblue',
  },
  main_drinks: {
    flex: 0.75,
    flexDirection: "row",
    marginTop: "5%",
    marginBottom: "10%",
  },
  main_text_box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
  },
  main_text: {
    color: "black",
    fontSize: 20,
  },
  main_button_area: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "25%",
    width: "50%",

  },
  main_button: {
    backgroundColor: 'black',
    color: "white",
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "5%"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  main_cogwheel: {
    flex: 0.25,
    backgroundColor: "#99d8ea",
    paddingLeft: "91%",
    paddingTop: "1.5%",
  },
});




//<QRCodeScanner
//       onRead={e => {
//         console.log('new', e);
//         console.log(test(e));
//       }}
//       flashMode={RNCamera.Constants.FlashMode.off}
//       reactivate={true}
//       reactivateTimeout={1000}
//     />
