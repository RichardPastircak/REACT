import * as React from "react";
import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from "react-native";
import DynamicComponent from "react-native-dynamic-render";
import { openAppWithData } from "react-native-send-intent";

export function Api ({navigation}) {
  const [dynamicData, setDynamicData] = React.useState(null)
  const [currAlcoholic, setCurrAlcoholic] = React.useState(0)
  const [currNonAlcoholic, setCurrNonAlcoholic] = React.useState(0)
  const [currDrinkType, setCurrDrinkType] = React.useState("ALCOHOLIC")

  const [data, setData] = React.useState([])
  const [props, setProps] = React.useState({name:"view", _uid: "1",})
  const [dataChanged, setDataChanged] = React.useState(false)

  //nazov,kategoria, pohar, pocet ingredincii, ingredience, mierkaingerdiencii, obrazok -> 8
  const dynamicRedner = (data) => {
    let formatedData = []

      //nazov
      formatedData.push(<Text key={"text"+100}
        style={{backgroundColor: "darkblue", borderBottomRightRadius: 8, borderBottomLeftRadius: 8 ,
          color: "white", fontSize: 28, fontWeight: "bold", textAlign: "center",
          position: "absolute", top: 0, width: "100%", padding: 5}}>
        {data[0][0]}</Text>)

      //kategoria
      formatedData.push(<Text key={"text"+(100+1)}
        style={{color: "darkblue", fontSize: 25, fontWeight: "bold", textAlign: "center", position: "absolute", top: "10%", width: "100%"}}>
        Category of drink: {data[0][1]}</Text>)

      //pohar
      formatedData.push(<Text key={"text"+(100+2)}
        style={{color: "darkblue", fontSize: 20, fontWeight: "bold", textAlign: "center", position: "absolute", top: "18%", width: "100%"}}>
        Glass type: {data[0][2]}</Text>)

      //obrazok
      formatedData.push(<Image source={{uri: data[0][6]}} key={"image"}
        style={{width: 300, height: 300, resizeMode: "contain", borderWidth: 3, borderColor: "darkblue", position: "absolute", top: "22%", marginLeft: "11%"}}/>)

      //ingredience heading
      formatedData.push(<Text key={"text"+(100+3)}
        style={{color: "darkblue", fontSize: 25, fontWeight: "bold", textAlign: "center", position: "absolute", top: "63%", width: "100%"}}
        >Ingredience:</Text>)

      //margin for ingredience
      formatedData.push(<View key={"view"} style={{height: "55%", }}/>)

      //ingredience
      let length = data[0][3]
      for (let j = 0; j < length-1; j++){
        formatedData.push(<Text key={"text"+(200+4+j)}
          style={{color: "darkblue", fontSize: 13, fontWeight: "500", textAlign: "left", marginLeft: "12%"}}
          >{data[0][5][j]} of {data[0][4][j]} </Text>) //meritko j + ingredianca j
      }

    setDynamicData(formatedData)
  }

  const apiData = async () => {
    let position = (currDrinkType === "ALCOHOLIC") ? currAlcoholic : currNonAlcoholic
    let drinktype = (currDrinkType === "ALCOHOLIC") ? "Alcoholic" : "Non_Alcoholic"
    try{
      let formatedData = []
        let result = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a='+drinktype
        ) .then((responsejson) => responsejson.json())
          .then(async (fetchDrink) => {
            const drink = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + fetchDrink["drinks"][position]["idDrink"])
              .then((drinkjson) => drinkjson.json())
              .then((apidata) => {
                let ingridience = []
                let resources = []
                let length = 0
                for (let j = 1; j <= 15; j++){
                  if(apidata["drinks"][0]["strIngredient"+j] !== null && apidata["drinks"][0]["strIngredient"+j] !== ""){
                    ingridience.push(apidata["drinks"][0]["strIngredient"+j])
                    resources.push(apidata["drinks"][0]["strMeasure"+j])
                  }
                  else {
                    length = j
                    break
                  }
                }
                formatedData.push([apidata["drinks"][0]["strDrink"],apidata["drinks"][0]["strCategory"],apidata["drinks"][0]["strGlass"], length, ingridience, resources, apidata["drinks"][0]["strDrinkThumb"]])
              })
          })

      //END OF FOR
      dynamicRedner(formatedData)
    }catch (e){
      console.error("Loading from api failed: "+ e)
    }
  }

  React.useEffect(() => {
    console.log(currAlcoholic + ' ' + currDrinkType + ' ' + currNonAlcoholic)
    apiData()
  },[currAlcoholic, currDrinkType, currNonAlcoholic])

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{flex: 1, justifyContent: "center"}}>
        {/* <DynamicComponent
            {...props}
            mapComponents = {mapComponents}
       />*/}
       {dynamicData}
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-evenly", marginBottom: "2%"}}>
        <TouchableOpacity style={styles.button} onPress={() => {
          let tmp
          if(currDrinkType === "ALCOHOLIC"){
            tmp = (currAlcoholic-1 < 10) ? 0 : (currAlcoholic-1)
            setCurrAlcoholic(tmp)
          }
          else{
            tmp = (currNonAlcoholic-1 < 10) ? 0 : (currNonAlcoholic-1)
            setCurrNonAlcoholic(tmp)
          }
          apiData()
        }}>
          <Text style={styles.text}>PREVIOUS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          let tmp = (currDrinkType === "ALCOHOLIC") ? "NONALCOHOLIC" : "ALCOHOLIC"
          setCurrDrinkType(tmp)
          apiData()
        }}>
          <Text style={styles.text}>{(currDrinkType === "ALCOHOLIC") ? "NONALCOHOLIC" : "ALCOHOLIC"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          let tmp
          if(currDrinkType === "ALCOHOLIC"){
            tmp = (currAlcoholic+1> 9) ? 0 : (currAlcoholic+1)
            setCurrAlcoholic(tmp)
          }
          else{
            tmp = (currNonAlcoholic+1 > 10) ? 0 : (currNonAlcoholic+1)
            setCurrNonAlcoholic(tmp)
          }
          apiData()
        }}>
          <Text style={styles.text}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "lightblue",
  },
  button: {
    backgroundColor: "darkblue", borderRadius: 10,
    padding: "2%", paddingLeft: "5%", paddingRight: "5%"
  },
  text: {
    color: "white",
  }
});
