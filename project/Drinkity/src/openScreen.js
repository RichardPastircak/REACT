import * as React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useItems } from "./reduxstuff";
import {useTranslation} from "react-i18next";
import './i18n';

export function mainUserData ({navigation}){
  const { t, i18n } = useTranslation();
  const [age, setAge] = React.useState(null)
  const [weight,setWeight] = React.useState(null)
  const [waterAmounth, setWaterAmounth] = React.useState(0)

  const [itemsOpen, setItemsOpen] = useItems();

  async function calculateWaterAmounth (age, weight) {
    let newWaterAmounth

    if (age < 1){newWaterAmounth = 150*weight}
    else if(age < 6){newWaterAmounth = 112*weight}
    else if(age < 12) {newWaterAmounth = 85*weight}
    else if(age < 18) {newWaterAmounth = 50*weight}
    else {newWaterAmounth = 32*weight}

    try {
      await AsyncStorage.setItem('waterAmounth', JSON.stringify(newWaterAmounth))
    } catch (e) {
      console.error("Couldn't save user suggest water amounth: " + e)
    }
    setWaterAmounth(newWaterAmounth)
  }

  React.useEffect(() =>{
    if(waterAmounth !== 0){
      setItemsOpen({"waterAmounth": waterAmounth});
      navigation.navigate('Home',itemsOpen)
    }
  },[waterAmounth])

  return(
    <SafeAreaView style={styles.screen}>
      <View style={{flex: 1,  backgroundColor: "darkblue", paddingTop: "2%", width: "100%"}}>
        <Text style={{flex: 1, textAlign: "center", color: "white", fontWeight: "bold", fontSize: 30, }}
          >{t('WELCOME TO DRINKITY')}</Text>
        <Text style={{flex: 3, backgroundColor: "lightblue", color: "darkblue", fontWeight: "500", fontSize: 18, paddingTop: "5%", paddingLeft: "1.5%"}}
        >{t('Before, I can calculate the suggested daily intake of water, I need you to answer the following questions')}</Text>
      </View>

      <View style={styles.views}>
        <Text style={styles.text}>{t('What\'s your age?')}</Text>
        <TextInput
          style = {styles.inputs}
          onChangeText={setAge}
          placeholderTextColor={"black"}
          value={age}
          placeholder={t('Insert your age')}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.views}>
        <Text style={styles.text}>{t('What\'s your weight?')}</Text>
        <TextInput
          style = {styles.inputs}
          onChangeText={setWeight}
          placeholderTextColor={"black"}
          value={weight}
          placeholder={t('Insert your weigth')}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={{flex: 0.25, justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "5%"}}
                        onPress={() => {
                          calculateWaterAmounth(age, weight)
                        }}>
        <Text
          style={{color: "white", fontWeight: "bold", fontSize: 20, backgroundColor: "darkblue", padding: "3%", paddingLeft: "10%", paddingRight: "10%",
            borderRadius: 10}}
          >{t('Send')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export function settings({navigation}){
  const { t, i18n } = useTranslation();
  const [age, setAge] = React.useState(null)
  const [weight,setWeight] = React.useState(null)
  const [itemsSettings, setItemsSetting] = useItems();
  const [waterAmounth, setWaterAmounth] = React.useState(null)

  async function calculateWaterAmounth (age, weight) {
    let newWaterAmounth

    if (age < 1){newWaterAmounth = 150*weight}
    else if(age < 6){newWaterAmounth = 112*weight}
    else if(age < 12) {newWaterAmounth = 85*weight}
    else if(age < 18) {newWaterAmounth = 50*weight}
    else {newWaterAmounth = 32*weight}

    try {
      await AsyncStorage.setItem('waterAmounth', JSON.stringify(newWaterAmounth))
    } catch (e) {
      console.error("Couldn't save user suggest water amounth: " + e)
    }

    setWaterAmounth(newWaterAmounth)
  }

  React.useEffect(() => {
    if(waterAmounth !== null){
      setItemsSetting({"waterAmounth": waterAmounth})
      navigation.navigate('Home', itemsSettings)
    }
  },[waterAmounth])

  return(
    <SafeAreaView style={styles.screen}>
      <View style={{flex: 1,  backgroundColor: "darkblue", paddingTop: "2%", width: "100%"}}>
        <Text style={{flex: 1, textAlign: "center", color: "white", fontWeight: "bold", fontSize: 30, }}
        >{t('SETTINGS')}</Text>
        <Text style={{flex: 3, backgroundColor: "lightblue", color: "darkblue", fontWeight: "500", fontSize: 18, paddingTop: "5%", paddingLeft: "1.5%"}}
        >{t('Here you can change your age and weight to recalculate your daily suggested intake of water')}.</Text>
      </View>

      <View style={styles.views}>
        <Text style={styles.text}>{t('What\'s your age?')}</Text>
        <TextInput
          style = {styles.inputs}
          onChangeText={setAge}
          placeholderTextColor={"black"}
          value={age}
          placeholder={t('Insert your age')}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.views}>
        <Text style={styles.text}>{t('What\'s your weight?')}</Text>
        <TextInput
          style = {styles.inputs}
          onChangeText={setWeight}
          placeholderTextColor={"black"}
          value={weight}
          placeholder={t('Insert your weigth')}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={{flex: 0.25, justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "5%"}} onPress={() => {
        calculateWaterAmounth(age,weight)
      }}>
        <Text
          style={{color: "white", fontWeight: "bold", fontSize: 20, backgroundColor: "darkblue", padding: "3%", paddingLeft: "10%", paddingRight: "10%",
            borderRadius: 10}}
        >{t('Change Data')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  views: {
    flex: 1,
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",

  },
  inputs: {
    borderWidth: 1.5,
    marginTop: "1%",
    paddingBottom: "1%",

  },
  text: {
    color: "darkblue",
    fontSize: 15,
    fontWeight: "500",
  },
})
