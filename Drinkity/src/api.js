import * as React from "react";
import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DynamicComponent from "react-native-dynamic-render";


export function Api ({navigation}) {
  const [data, setData] = React.useState([])
  const [props, setProps] = React.useState({name:"view", _uid: "1",})
  const [dataChanged, setDataChanged] = React.useState(false)

  const apiData = async () => {
    try {
      let response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
      );
      let json = await response.json();
      let tmp = []
      for (let i in json["drinks"]){
        tmp.push([json["drinks"][i]["strDrink"],json["drinks"][i]["strCategory"],json["drinks"][i]["strDrinkThumb"]])
      }
      setDataChanged(true)
      setData(tmp)
    } catch (error) {
      console.error(error);
    }
  };

  const mapComponents = {
    text: Text,
    view: View,
    image: ImageBackground,
    pressable: Pressable
  }

  React.useEffect(() => {
    apiData().then(r => console.log(data))
  },[])

  function pressableImage() {
    navigation.navigate("Home")
  }

  React.useEffect(() => {
    if(dataChanged) {
      let test = {
        name: "view",
        _uid: "99999",
        props: { style: { flex: 1, flexDirection: "column", alignItems: "center" } },
        children: []
      }

      let usedCategories = []
      for (let i = 0; i < data.length; i++) {
        let index = findIndesk(data[i][1], usedCategories)
        if (index === -1){
          usedCategories.push(data[i][1])
          test["children"] = [...test["children"], {
            name: "view",
            children: [{name: "text", children: data[i][1].toString(), props: {style: {color: "green", fontWeight: "bold", fontSize: 25}}},
              {name: "text", _uid: i, children: data[i][0].toString()},
              {name: "image", props: {source: {uri: data[i][2]}, style: {width: 100, height: 100, resizeMode: 'contain' }}}],
            props: {style: {flex: 1, alignItems: "center"}}
          }]

        } else {
          test["children"][index]["children"] = [...test["children"][index]["children"], {
            name: "text",
            children: data[i][0].toString(),
            props: {style: {color: "red"}}
            },
            {name: "pressable", children: [{name: "image", props: {source: {uri: data[i][2]}, style: {width: 100, height: 100, resizeMode: 'contain' }}}],
              props: {}},
          ]}
      }
      //console.log(test["children"][0]["children"])
      setProps(test)
    }
  },[data])

  const findIndesk = (d, usedCategories) => {
    for (let i = 0; i < usedCategories.length; i++){
      if (usedCategories[i] === d){
        return i
      }
    }
    return -1
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={{flex: 1}}>
        <Button title={"Home"} onPress={() => navigation.navigate('Home')}/>
          <DynamicComponent
            {...props}
            mapComponents = {mapComponents}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  category: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "blue",
    textAlign: "center",
    color: "green",
    fontWeight: "bold"
  }
});
