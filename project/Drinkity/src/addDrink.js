import React, { useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Platform, PermissionsAndroid,
} from "react-native";
import {useItems} from './reduxstuff';
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
  const [percentage, setPercatange] = React.useState(0.0)
  const [userImages, setUserImages] = React.useState(null)

  const [showWater,setShowWater] = React.useState(false)
  const [showJuice,setShowJuice] = React.useState(false)
  const [showMilk,setShowMilk] = React.useState(false)
  const [showCoffee,setShowCoffee] = React.useState(false)
  const [showCustom,setShowCustom] = React.useState(false)

  useEffect(function(){
    if(percentage !== 0.0) {
      setItems([{firstPicture, amounth, percentage}]);
      navigation.navigate('Home', items);
    }
  },[percentage]);


  useEffect(() => {
    async function loadData() {
      try {
        //await AsyncStorage.removeItem("userCustomDrinks")
        let jsondata = await AsyncStorage.getItem("userCustomDrinks");
          jsondata = JSON.parse(jsondata)
          let ownDrinksData = []
          for (let i in jsondata) {
            ownDrinksData.push([<Pressable key={'pressable'+i} onPress={() => {setFirstPicture({uri: jsondata[i][0]}); setAmounth(parseInt(jsondata[i][1])); setPercatange(parseFloat(jsondata[i][2]/100))}}>
              <Image source={{ uri: jsondata[i][0] }} key={"images" + i} style={{ height: 150, width: 150, resizeMode: "contain", borderColor: "darkblue", borderWidth: 3}} />
              <Text key={"text" + i} style={styles.add_drink_picture_text}>{jsondata[i][1]} ml - {jsondata[i][2]}%</Text>
            </Pressable>])
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
      let storingData = [route.params[0]["uri"],route.params[1],route.params[2]]
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

        userCustomDrinks.push([<Pressable key={'Pressable'+length} onPress={() => {setFirstPicture(route.params[0]); setAmounth(parseInt(route.params[1])); setPercatange(parseFloat(route.params[2]/100))}}>
          <Image source={route.params[0]} key={"Images"+length} style={{height: 150, width: 150, resizeMode: "contain",borderWidth: 3, borderColor: "darkblue"}}/>
          <Text key={"Amounth"+length} style={styles.add_drink_picture_text}>{route.params[1]} ml - {route.params[2]}%</Text>
        </Pressable>])

        setUserImages(userCustomDrinks)
        setShowCustom(true)
        storeUserImage()
      }
  },[route.params])

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>

        {/*WATER*/}
        <Pressable style={{flex: 1, flexDirection: "row",
          backgroundColor: "darkblue",
          borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5, alignItems: "center", justifyContent: "center", marginBottom: 15}} onPress={() => setShowWater(!showWater)}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Water')} - 100%</Text>
        </Pressable>

        {(!showWater) ? null :
          <View style={styles.add_drinks_picture_column}>
            {/*First row of drinks*/}
            <View style={styles.add_drink_picture_row}>
              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("1"); setAmounth(100); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/cup_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>100 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("2"); setAmounth(150); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/glass_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>150 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("2"); setAmounth(300); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/glass_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>300 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("3"); setAmounth(500); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/big_glass_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>500 ml</Text>
              </View>
            </View>

            {/*Second row of drinks*/}
            <View style={styles.add_drink_picture_row}>
              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("3"); setAmounth(750); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/big_glass_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>750 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("4"); setAmounth(1500); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/bottle_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>1500 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("4"); setAmounth(2000); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/water/bottle_blue.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>2000 ml</Text>
              </View>
            </View>
          </View>
        }

        {/*JUICE*/}
        <Pressable style={styles.add_drink_heading_pictures} onPress={() => setShowJuice(!showJuice)}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Juice')} - 90%</Text>
        </Pressable>

        {(!showJuice) ? null :
          <View style={styles.add_drinks_picture_column}>
            {/*First row of drinks*/}
            <View style={styles.add_drink_picture_row}>
              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("5"); setAmounth(200); setPercatange(0.9)
                }}>
                  <Image source={require("./assets/drinks/juice/glass_orange.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>200 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("5"); setAmounth(250); setPercatange(0.9)
                }}>
                  <Image source={require("./assets/drinks/juice/glass_orange.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>250 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("6"); setAmounth(1000); setPercatange(0.9)
                }}>
                  <Image source={require("./assets/drinks/juice/bottle_orange.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>1000 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("6"); setAmounth(2000); setPercatange(0.9)
                }}>
                  <Image source={require("./assets/drinks/juice/bottle_orange.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>2000 ml</Text>
              </View>
            </View>
          </View>
        }

        {/*MILK*/}
        <Pressable style={styles.add_drink_heading_pictures} onPress={() => setShowMilk(!showMilk)}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Milk')} - 100%</Text>
        </Pressable>

        {(!showMilk) ? null :
          <View style={styles.add_drinks_picture_column}>
            {/*First row of drinks*/}
            <View style={styles.add_drink_picture_row}>
              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("7"); setAmounth(200); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/milk/glass_white.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>200 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("7"); setAmounth(300); setPercatange(1)
                }}>
                  <Image source={require("./assets/drinks/milk/glass_white.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>300 ml</Text>
              </View>

                <View style={styles.add_drink_picture_item}>
                  <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                    setFirstPicture("8"); setAmounth(500); setPercatange(1)
                  }}>
                    <Image source={require("./assets/drinks/milk/big_glass_white.png")} style={styles.image} />
                  </Pressable>
                  <Text style={styles.add_drink_picture_text}>500 ml</Text>
              </View>
            </View>
          </View>
        }

        {/*COFFEE*/}
        <Pressable style={styles.add_drink_heading_pictures} onPress={() => setShowCoffee(!showCoffee)}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Coffee')} - 80%</Text>
        </Pressable>

        {(!showCoffee) ? null :
          <View style={styles.add_drinks_picture_column}>
            {/*First row of drinks*/}
            <View style={styles.add_drink_picture_row}>
              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("9"); setAmounth(100); setPercatange(0.8)
                }}>
                  <Image source={require("./assets/drinks/coffee/cup_brown.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>100 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("9"); setAmounth(150); setPercatange(0.8)
                }}>
                  <Image source={require("./assets/drinks/coffee/cup_brown.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>150 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("a"); setAmounth(200); setPercatange(0.8)
                }}>
                  <Image source={require("./assets/drinks/coffee/glass_brown.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>200 ml</Text>
              </View>

              <View style={styles.add_drink_picture_item}>
                <Pressable style={styles.add_drink_picture_pressable} onPress={() => {
                  setFirstPicture("b"); setAmounth(1000); setPercatange(0.8)
                }}>
                  <Image source={require("./assets/drinks/coffee/custom_brown.png")} style={styles.image} />
                </Pressable>
                <Text style={styles.add_drink_picture_text}>1000 ml</Text>
              </View>
            </View>
          </View>
        }

        {/*CUSTOM FROM HERE*/}
        <Pressable style={styles.add_drink_heading_pictures} onPress={() => setShowCustom(!showCustom)}>
          <Text style={styles.add_drink_heading_pictures_text}>{t('Own')}</Text>
        </Pressable>
        <View style={{flex: 2, justifyContent: "center", alignItems: "center", marginBottom: 20}}>
          {(userImages !== null && showCustom)
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
  const [userImmage, setUserImmage] = React.useState(require("./assets/empty/glass.png"))
  const [number,setNumber] = React.useState(null)
  const [percentage,setPercentage] = React.useState(null)
  const [showButton, setShowButton] = React.useState(false)

  const userPicture = async(using) => {
    let result
    let permisionscamer = null
    let permissionsstorage = null
    if(Platform.OS === "android") {
      permissionsstorage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
      permisionscamer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)

      if (using === "camera") {
        result = await launchCamera().catch((e) => {
          console.log(e)
        })
      } else {
        result = await launchImageLibrary().catch((e) => {
          console.log(e)
        })
      }

      if ((result["didCancel"] !== true || result["didCancel"] === undefined) && permisionscamer === PermissionsAndroid.RESULTS.GRANTED && permissionsstorage === PermissionsAndroid.RESULTS.GRANTED)  {
        let uri = result["assets"][0]["uri"]

        setUserImmage({ uri: uri })
      }
    }
  }

  return(
    <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "lightblue", justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontWeight: "900", fontSize: 40, color: "white", textAlign: "center", backgroundColor: "darkblue", width: "100%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: "2%"}}>
        {t('Your Drink')}</Text>

      <View style={{flex: 2, flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "25%"}}>
        <Text style={{color: "black", fontSize: 25, marginBottom: "5%", fontWeight: "500"}}>{t('Image')}</Text>
        <Image source={userImmage} style={{width: 100, height: 100, resizeMode: "center", borderWidth: 2, borderColor: "black", marginBottom: "5%", backgroundColor: "white"}}/>
        <Text style={{color: "black", fontSize: 25, marginBottom: "5%", fontWeight: "500"}}>{t('Amounth')}</Text>
        <TextInput
          style = {{borderWidth: 2, width: 220, color: "black", fontSize: 15, fontWeight: "500", backgroundColor: "white", textAlign: "center"}}
          onChangeText={setNumber}
          placeholderTextColor={"grey"}
          value={number}
          placeholder={t('Drink amounth')}
          keyboardType="numeric"
        />

        <Text style={{color: "black", fontSize: 25, marginBottom: "5%", marginTop: "5%", fontWeight: "500"}}>{t('Percentage')}</Text>
        <TextInput
          style = {{borderWidth: 2, width: 220, color: "black", fontSize: 15, fontWeight: "500", backgroundColor: "white", textAlign: "center"}}
          onChangeText={setPercentage}
          placeholderTextColor={"grey"}
          value={percentage}
          placeholder={t('Percentage of water in drink')}
          keyboardType="numeric"
        />
      </View>

      {/*BUTTON AREA*/ }
      {(userImmage !== require("./assets/empty/glass.png") && number !== null && percentage !== null) ?
        <View style={{alignItems: "center", position: "absolute", width: "100%", bottom: "10%"}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddDrink",[userImmage, number, percentage])}>
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
    resizeMode: 'contain',
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



