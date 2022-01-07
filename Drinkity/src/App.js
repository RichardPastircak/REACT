import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image, View, SafeAreaView, Button, Pressable
} from "react-native";


import { AddDrinksPart } from "./addDrink.js";
import { ItemsProvider} from "./reduxstuff.js";
import {Api} from "./api";
import { useItems} from "./reduxstuff.js";
import { useEffect } from "react";


//const [dailyWater, setDaylyWater] = React.useState(1500);
//const [waterDrank, setWaterDrank] = React.useState(0);

function Home ({route, navigation}){
  const [water,setWater] = React.useState(0);
  const [mainPicture, setMainPicture] = React.useState(require("./assets/mainpicture/level0.png"));
  const [items, setItems] = useItems();
  const [drinks, setDrinks] = React.useState([
    ["1", 100],
    ["2", 150],
    ["3", 500],
    ["4", 2000]
    ]);
  const [usageDrinks, setUsageDrinks] = React.useState([0,0,0,0])

  const [firstTime,setFirstTime] = React.useState(true);
  const pictures = {
    "1": require("./assets/drinks_water/cup_blue.png"),
    "2": require("./assets/drinks_water/glass_blue.png"),
    "3": require("./assets/drinks_water/big_glass_blue.png"),
    "4": require("./assets/drinks_water/bottle_blue.png"),
  }

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false)
    }
    else{
      storeData('drinks', drinks)
    }
  },[usageDrinks])

  useEffect( () => {
    if(!(route.params in window)) {
      //console.log(items)
      //setItems()
      rearange()
    }
    else{
      loadData('drinks').then((data) => {
        if(data != null){
          setDrinks(data)
        }})
    }
  },[items])

  async function loadData(key) {
    try{
      const jsondata =  await AsyncStorage.getItem(key);
      return JSON.parse(jsondata);
    }catch(e){
      console.error("Couldnt load data marked by key: " + key);
    }
  }

  async function storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error("Failed to save data: " + key);
    }
  }

  const rearange = () => {
    let usages = [...usageDrinks]
    let allDrinks = [...drinks]
    let maxusage = Math.max(...usages)

    let test = false
    for (let i = 0; i < 3; i++) {
      if (allDrinks[i][1] === items[0]["amounth"] && allDrinks[i][0] === items[0]["firstPicture"]) {
        test = true
        break
      }
    }

    if (test) {
      let position
      for (let i = 0; i < 4; i++){
        if(allDrinks[i][0] === items[0]["firstPicture"] && allDrinks[i][1] === items[0]["amounth"]){
          position = i;
          if(position === 0) return
          break
        }
      }

      let tmp = Math.max(...usages)
      let tmp1 = allDrinks[position]

      for (let i = 2; i >= 0; i--){
        if(i !== position){
          usages[i+1] = usages[i]
          allDrinks[i+1] = allDrinks[i]
        }
      }
      usages[0] = tmp+1
      allDrinks[0] = tmp1
      //console.log(usages)
    }
    else {
      //rearange
      for (let i = 2; i >= 0; i--) {
        allDrinks[i + 1] = allDrinks[i]
        usages[i + 1] = usages[i]
      }
      allDrinks[0] = [items[0]["firstPicture"], items[0]["amounth"]]
      usages[0] = maxusage + 1

      //stop overusing
      if (Math.min(...usages) >= 10) {
        for (let i = 0; i < 4; i++) {
          usages[i] -= 10
        }
      }
    }

    //set new values
    setUsageDrinks(usages)
    setDrinks(allDrinks)

  }

  const changeUsage = (drinkPosition) => {
    let tmp = [...usageDrinks]
    tmp[drinkPosition] +=1

    if(drinkPosition > 0 && tmp[drinkPosition-1] < tmp[drinkPosition]){
      let allDrinks = [...drinks]
      let shuffle = tmp[drinkPosition]
      tmp[drinkPosition] = tmp[drinkPosition-1]
      tmp[drinkPosition-1] = shuffle

      shuffle = allDrinks[drinkPosition]
      allDrinks[drinkPosition] = allDrinks[drinkPosition-1]
      allDrinks[drinkPosition-1] = shuffle
      setDrinks(allDrinks)
    }

    setUsageDrinks(tmp)
  }

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
        <Image source={require('./assets/cogwheel.png')} style={styles.image}/>
      </Pressable>

      <View style={styles.main_image}>
        <Image source={mainPicture}/>
        <Text style={styles.water_amount}>{water} ml</Text>
      </View>
      <View style={styles.main_drinks}>

        <Pressable style={{flex: 1}} onPress={() => navigation.navigate('AddDrinksPart')}>
          <Image source={require("./assets/add_drink.png")} style={styles.image}/>
        </Pressable>
        <Pressable style={{flex: 1, flexDirection: "column"}} onPress={() => {drink(drinks[0][1]), changeUsage(0)}}>
          <Image source={pictures[drinks[0][0]]} style={styles.image}/>
          <Text style={styles.pictures_description}>{drinks[0][1]} ml</Text>
        </Pressable>
        <Pressable style={{flex: 1}} onPress={() => {drink(drinks[1][1]), changeUsage(1)}}>
          <Image source={pictures[drinks[1][0]]} style={styles.image}/>
          <Text style={styles.pictures_description}>{drinks[1][1]} ml</Text>
        </Pressable>
        <Pressable style={{flex: 1}} onPress={() => {drink(drinks[2][1]), changeUsage(2)}}>
          <Image source={pictures[drinks[2][0]]} style={styles.image}/>
          <Text style={styles.pictures_description}>{drinks[2][1]} ml</Text>
        </Pressable>
        <Pressable style={{flex: 1}} onPress={() => {drink(drinks[3][1]), changeUsage(3)}}>
          <Image source={pictures[drinks[3][0]]} style={styles.image}/>
          <Text style={styles.pictures_description}>{drinks[3][1]} ml</Text>
        </Pressable>

      </View>

      <View style={styles.main_text_box}>
      <Text style={styles.main_text}>Tired of drinking just a water? Find inspiration online!</Text>
      </View>

      <View style={styles.main_button_area}>
        <TouchableOpacity style={styles.main_button} onPress={() => navigation.navigate('Api')}>
          <Text style={{color: "white"}}>Find inspiration online</Text>
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


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AddDrinksPart" component={AddDrinksPart}/>
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
    backgroundColor: "white"
  },

  main_image: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99d8ea',
    borderBottomColor: "darkblue",
    borderBottomWidth: 5
  },
  water_amount: {
    fontSize: 25,
    fontFamily: 'serif',
    color: 'darkblue',
  },
  main_drinks: {
    flex: 1,
    flexDirection: "row",
    marginTop: "5%",
    marginBottom: "5%",
    paddingBottom: "5%",
    borderBottomColor: "darkblue",
    borderBottomWidth: 5
  },
  pictures_description: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
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
    fontSize: 25,
    textAlign: "center"
  },
  main_button_area: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "25%",
    width: "50%",

  },
  main_button: {
    backgroundColor: 'darkblue',
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
    borderRadius: 10,
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

