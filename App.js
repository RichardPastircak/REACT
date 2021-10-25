import React, {useState, Component} from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Pressable, Linking, Platform, Button} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';


export default function App() {
  const [value, setValue] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const[textDel, setTextDel] = useState("")

  const pressHandler = (i) => {
    setValue(value + i);
    if(!showDel && value.length >= 0){
      setTextDel('<=');
      setShowDel(true);
    }
  }

  let image = isAccepted
    ? require("./assets/decline.png/")
    : require("./assets/accept.png/");

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.phone}>Phone</Text>

          <View style={styles.textfield}>   
            <Text style={styles.text}>{value}</Text>
            <TouchableOpacity style={{flex:1}}
              onPress={()=>{
                if(showDel){
                  setValue(value.slice(0,-1))
            
                  if(value.length-1 === 0){
                    setTextDel('');
                    setShowDel(false);
                  }
                }
              }} onLongPress={()=>{setValue(""); setShowDel(false); setTextDel('')}}>
              <Text style={{fontSize: 20}}>{textDel}</Text>
            </TouchableOpacity>
          </View>  
        
        
          <View style={styles.buttonBox}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}  
                onPress={()=>pressHandler("1")}>
                <Text style={styles.buttonTextBig}>1</Text>
                <Text style={styles.buttonTextSmall}>O_O</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={()=>pressHandler("2")}>
                <Text style={styles.buttonTextBig}>2</Text>
                <Text style={styles.buttonTextSmall}>ABC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={()=>pressHandler("3")}>
                <Text style={styles.buttonTextBig}>3</Text>
                <Text style={styles.buttonTextSmall}>DEF</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}
                onPress={()=>pressHandler("4")}>
                <Text style={styles.buttonTextBig}>4</Text>
                <Text style={styles.buttonTextSmall}>GHI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={()=>pressHandler("5")}>
                <Text style={styles.buttonTextBig}>5</Text>
                <Text style={styles.buttonTextSmall}>JKL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={()=>pressHandler("6")}>
                <Text style={styles.buttonTextBig}>6</Text>
                <Text style={styles.buttonTextSmall}>MNO</Text>
              </TouchableOpacity>
            </View>
              
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("7")}>
                  <Text style={styles.buttonTextBig}>7</Text>
                  <Text style={styles.buttonTextSmall}>PQRS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("8")}>
                  <Text style={styles.buttonTextBig}>8</Text>
                  <Text style={styles.buttonTextSmall}>TUV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("9")}>
                  <Text style={styles.buttonTextBig}>9</Text>
                  <Text style={styles.buttonTextSmall}>WXYZ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("*")}>
                  <Text style={styles.buttonTextBig}>*</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("0")} onLongPress={()=>pressHandler("+")}>
                  <Text style={styles.buttonTextBig}>0</Text>
                  <Text style={styles.buttonTextSmall}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={()=>pressHandler("#")}>
                  <Text style={styles.buttonTextBig}>#</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.call}>
            <Pressable onPress={()=>{
              if(value.indexOf('#') == -1 && value.indexOf('*') == -1 && value.length > 0 && value.indexOf('+') == -1){
                setIsAccepted(false);
                RNImmediatePhoneCall.immediatePhoneCall(value);
                setValue("");
                //setIsAccepted(!isAccepted);
              }
            }}>
              <Image source={image} style={{width: 50, height: 50}}/>
            </Pressable>
          </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
  },
  phone:{
    padding: '2%',
    flex: 1,
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
  },
  textfield: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingLeft: '5%',
    color: 'black',
    fontSize: 35,
    flex: 9,
  },
  buttonBox: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
  },
  buttonRow: {
    flexDirection: "row", 
    flex: 1,
  
  },
  button: {
    width: '33.33%',
    color: 'black',
    backgroundColor: 'lightgrey',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextBig: {
    color: 'black',
    fontSize: 30,
  },
  buttonTextSmall: {
    color: 'grey',
    fontSize: 12,
  },
  call: {
    flex: 0.5,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'grey',
  }
});