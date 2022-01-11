import React, { useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {useItems} from './reduxstuff';
import { ItemsProvider} from "./reduxstuff.js";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";
import './i18n';

export function AddDrink ({route, navigation}) {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useItems(); // <- using items context as global useState
  const [firstPicture, setFirstPicture] = React.useState("");
  const [amounth, setAmounth] = React.useState(0);
  const [userImages, setUserImages] = React.useState(null)

  useEffect(function(){
    if(amounth != 0) {
      setItems([{firstPicture, amounth}]);
      navigation.navigate('Home', items);
    }
  },[amounth]);


  useEffect(() => {
    async function loadData() {
      try {
        //await AsyncStorage.removeItem("userCustomDrinks")//
        let jsondata = await AsyncStorage.getItem("userCustomDrinks");
          jsondata = JSON.parse(jsondata)
          let ownDrinksData = []
          for (let i in jsondata) {
            ownDrinksData.push([<Image source={{ uri: jsondata[i][0] }} key={"images" + i}
                                       style={{ height: 150, width: 150, resizeMode: "contain" }} />])
            ownDrinksData.push(<Text key={"test" + i} style={styles.add_drink_picture_text}>{jsondata[i][1]} ml</Text>)
          }
          setUserImages(ownDrinksData)

      } catch (e) {
        console.error("Couldn't load user custom drinks: " + e);
      }
    }
    loadData()
  },[])

  async function storeUserImage() {
    try {
      let storingData = [route.params[0]["uri"],route.params[1]]
      let jsondata = await AsyncStorage.getItem("userCustomDrinks");
      if (JSON.parse(jsondata) == null) {
        jsondata = []
        jsondata.push(storingData)
      }else {
        jsondata = JSON.parse(jsondata)
        jsondata.push(storingData)
      }

      await AsyncStorage.setItem("userCustomDrinks", JSON.stringify(jsondata))
    } catch (e) {
      console.error("Failed to save usersData: " + e);
    }
  }

  useEffect(() => {

      if (route.params !== undefined) {
        let userCustomDrinks = (userImages === null) ? [] :[...userImages]
        const length = (userImages === null) ? 0 : userImages.length
        userCustomDrinks.push([<Image source={route.params[0]} key={"images"+length} style={{height: 150, width: 150, resizeMode: "contain"}}/>])
        userCustomDrinks.push(<Text key={"test"+length} style={styles.add_drink_picture_text}>{route.params[1]} ml</Text>)

        setUserImages(userCustomDrinks)
        storeUserImage()
      }
  },[route.params])

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>

        <View style={{
          flex: 1, flexDirection: "row", justifyContent: "space-evenly",
          backgroundColor: "darkblue",
          borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5}}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Water')}</Text>
        </View>
        <View style={styles.add_drinks_picture_column}>
          {/*First row of drinks*/}
          <View style={styles.add_drink_picture_row}>
            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("1"), setAmounth(100)}}>
                <Image source={require("./assets/drinks_water/cup_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>100 ml</Text>
            </View>

            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("2"), setAmounth(150)}}>
              <Image source={require("./assets/drinks_water/glass_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>150 ml</Text>
            </View>

            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("2"),setAmounth(300)}}>
              <Image source={require("./assets/drinks_water/glass_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>300 ml</Text>
            </View>

            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("3"),setAmounth(500)}}>
                <Image source={require("./assets/drinks_water/big_glass_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>500 ml</Text>
            </View>
          </View>

          {/*Second row of drinks*/}
          <View style={styles.add_drink_picture_row}>
            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("3"),setAmounth(750)}}>
                <Image source={require("./assets/drinks_water/big_glass_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>750 ml</Text>
            </View>

            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("4"),setAmounth(1500)}}>
                <Image source={require("./assets/drinks_water/bottle_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>1500 ml</Text>
            </View>

            <View style={styles.add_drink_picture_item}>
              <Pressable style={styles.add_drink_picture_pressable} onPress={() => {setFirstPicture("4"),setAmounth(2000)}}>
                <Image source={require("./assets/drinks_water/bottle_blue.png")} style={styles.image}/>
              </Pressable>
              <Text style={styles.add_drink_picture_text}>2000 ml</Text>
            </View>
          </View>
        </View>

        {/*CUSTOM FROM HERE*/}
        <View style={styles.add_drink_heading_pictures}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Own')}</Text>
        </View>
        <View style={{flex: 2, justifyContent: "center", alignItems: "center", marginBottom: 20}}>
          {(userImages !== null)
            ? userImages
            : null}
        </View>

      </ScrollView>

      {/*BUTTON AREA*/}
      <View style={{height: 35}}/>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: 0, width: "100%"}}>
        <TouchableOpacity
          style={{backgroundColor: 'darkblue', alignItems: "center", padding: "3%", borderRadius: 10, marginBottom: 5}}
          onPress={()=>navigation.navigate("AddCustomDrink")}>
          <Text style={styles.button_text}>{t('Add Custom Drink')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function AddCustomDrink({navigation}) {
  const { t, i18n } = useTranslation();
  const [userImmage, setUserImmage] = React.useState(require("./assets/glass.png"))
  const [number,setNumber] = React.useState(null)
  const [showButton, setShowButton] = React.useState(false)

  const userPicture = async(using) => {
    let result
    if(using === "camera"){
      result = await launchCamera({saveToPhotos: true}).catch((e) => {console.log(e)})
    }
    else {
      result = await launchImageLibrary().catch((e) => {console.log(e)})
    }

    if (result["didCancel"] !== true || result["didCancel"] === undefined) {
      let uri = result["assets"][0]["uri"]

      setUserImmage({ uri: uri })
    }
  }

  return(
    <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "lightblue", justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontWeight: "900", fontSize: 40, color: "blue", textAlign: "center"}}>{t('Your Drink')}</Text>
      <View style={{flex: 2, flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "25%"}}>
        <Text style={{color: "black", fontSize: 25, marginBottom: "5%", fontWeight: "500"}}>{t('Image')}</Text>
        <Image source={userImmage} style={{width: 100, height: 100, resizeMode: "center", borderWidth: 2, borderColor: "black", marginBottom: "5%", backgroundColor: "white"}}/>
        <Text style={{color: "black", fontSize: 25, marginBottom: "5%", fontWeight: "500"}}>{t('Amounth')}</Text>
        <TextInput
          style = {{borderWidth: 2, width: 200, color: "black", fontSize: 15, fontWeight: "500", paddingLeft: 10, backgroundColor: "white"}}
          onChangeText={setNumber}
          placeholderTextColor={"black"}
          value={number}
          placeholder={t('Insert the drink amounth')}
          keyboardType="numeric"
        />
      </View>

      {/*BUTTON AREA*/ }
      {(userImmage !== require("./assets/glass.png") && number !== null) ?
        <View style={{alignItems: "center", position: "absolute", width: "100%", bottom: "10%"}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddDrink",[userImmage, number])}>
            <Text style={styles.button_text}>{t('Add Drink')}</Text>
          </TouchableOpacity>
        </View>
        : null}
      <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: 0, width: "100%", marginBottom: "2%"}}>
        <TouchableOpacity style={styles.button} onPress={()=>userPicture("camera")}>
          <Text style={styles.button_text}>{t('Take Picture')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>userPicture("galerry")}>
          <Text style={styles.button_text}>{t('Load from Gallery')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const Drawer = createNativeStackNavigator();

export function AddDrinksPart({route, navigation}) {
  return (
      <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="AddDrink">
        <Drawer.Screen name="AddDrink" component={AddDrink} />
        <Drawer.Screen name="AddCustomDrink" component={AddCustomDrink} />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
    width: null,
    height: 100,
    resizeMode: 'center',
  },
  add_drink_headings: {
    flex: 1, flexDirection: "row", justifyContent: "space-between",
    marginLeft: 5, marginRight: 5,

  },
  add_drink_heading_pictures: {
    flex: 1, flexDirection: "row", justifyContent: "space-evenly",
    marginTop: 20, marginBottom: 20,
    backgroundColor: "darkblue",
    borderRadius: 7.5,
  },
  add_drink_heading_pictures_text:{
    color: "white", fontWeight: "bold", fontSize: 22.5,
    padding: 8,
  },
  add_drinks_picture_column: {
    flex: 2,
    flexDirection: "column",
  },
  add_drink_picture_row: {
    flex: 1,
    flexDirection: "row",
  },
  add_drink_picture_item: {
    flex:1,
    flexDirection: "column",
  },
  add_drink_picture_pressable: {
    flex: 1,
  },
  add_drink_picture_text: {
    textAlign: "center",
    color: "darkblue",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 5, marginBottom: 10
  },
  button: {
    backgroundColor: 'darkblue',
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
  button_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});



