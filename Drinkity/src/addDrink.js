import React, { useEffect } from "react";
import { View, TextInput, Button, SafeAreaView, Text, Pressable, Image, StyleSheet } from "react-native";
import {useItems} from './reduxstuff';
import { waitFor } from "@babel/core/lib/gensync-utils/async";

export function AddDrink ({navigation}) {
  const [items, setItems] = useItems(); // <- using items context as global useState
  const [firstPicture, setFirstPicture] = React.useState("");

  useEffect(function(){
    if(firstPicture != "") {
      setItems([{firstPicture}]);
      navigation.navigate('Home', items);
    }
  },[firstPicture]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.add_drink_headings}>
        <Text>Own</Text>
        <Text>Edit</Text>
      </View>
      <View style={styles.add_drink_headings}>

      </View>

      <View style={styles.add_drink_heading_pictures}>
        <Text>Water</Text>
      </View>
      <View style={styles.add_drinks_picture_column}>
        {/*First row of drinks*/}
        <View style={styles.add_drink_picture_row}>
          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/cup_blue.png"))}>
              <Image source={require("./assets/drinks_water/cup_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>100 ml</Text>
          </View>

          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/glass_blue.png"))}>
            <Image source={require("./assets/drinks_water/glass_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>150 ml</Text>
          </View>

          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/glass_blue.png"))}>
            <Image source={require("./assets/drinks_water/glass_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>300 ml</Text>
          </View>

          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/big_glass_blue.png"))}>
            <Image source={require("./assets/drinks_water/big_glass_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>500 ml</Text>
          </View>
        </View>

        {/*Second row of drinks*/}
        <View style={styles.add_drink_picture_row}>
          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/big_glass_blue.png"))}>
              <Image source={require("./assets/drinks_water/big_glass_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>750 ml</Text>
          </View>

          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/bottle_blue.png"))}>
              <Image source={require("./assets/drinks_water/bottle_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>1500 ml</Text>
          </View>

          <View style={styles.add_drink_picture_item}>
            <Pressable style={styles.add_drink_picture_pressable} onPress={() => setFirstPicture(require("./assets/drinks_water/bottle_blue.png"))}>
              <Image source={require("./assets/drinks_water/bottle_blue.png")} style={styles.image}/>
            </Pressable>
            <Text style={styles.add_drink_picture_text}>2000 ml</Text>
          </View>
        </View>
      </View>

      <View style={{flex:5}}></View>
      <Button title={'Back to main screen'} onPress={() => navigation.navigate('Home')}/>
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
  add_drink_headings: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  add_drink_heading_pictures: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  add_drinks_picture_column: {
    flex: 2,
    flexDirection: "column",
  },
  add_drink_picture_row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "space-evenly",
  },
  add_drink_picture_item: {
    flex:1,
    flexDirection: "column",
  },
  add_drink_picture_pressable: {
    flex: 1,

    //borderColor: 'black',
    //borderStyle: 'solid',
    //borderWidth: 3,
  },
  add_drink_picture_text: {
    textAlign: "center",
  },
});



/*export function Add({ route, navigation }) {
  const [items, setItems] = useItems(); // <- using items context as global useState
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('0');

  const addItem = () => {
    setItems([...items, { itemName, itemPrice }]);
    setItemName('');
    setItemPrice('0');
  };

  return (
    <View>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        multiline
        placeholder="What's on your mind?"
        value={itemPrice}
        onChangeText={setItemPrice}
      />
      <Button
        title="Done"
        onPress={() => {
          addItem();
          // Pass params back to home screen
          navigation.navigate('Home', items);
        }}
      />
    </View>
  );
}*/

