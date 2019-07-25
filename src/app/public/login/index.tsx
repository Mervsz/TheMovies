import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Theme from "fe-theme";
import { SansProText, RoundedInput, LeafyButton, VectorLinesBG } from "fe-components";
import theme from "fe-theme";

interface IProps{

}

interface IState{

}

export default class Login extends Component<IProps,IState>{
  render(){
    return(
      <VectorLinesBG>
      <ScrollView contentContainerStyle={styles.container}>


          
          <Image style={styles.logo} source={require('fe-common/assets/img/app-logo.png')} resizeMode="contain" />

          <View style={styles.inputs}>
            <RoundedInput placeholder="User Name"/>
            <RoundedInput placeholder="Password" secureTextEntry={true}/>
          </View>

          <View style={styles.button}>
            <LeafyButton title="Login" onPress={() => alert("logged In")}/>
          </View>


      </ScrollView>
      </VectorLinesBG>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: "transparent",
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
    width: 140,
    height: 140,
    tintColor: theme.foreground
  },
  inputs:{
    width: '80%',
    height: 120,
    justifyContent: 'space-around',
    marginVertical:10
  },
  button:{
    width: '80%',
    height: 50,
    marginTop:5
  }
})
  