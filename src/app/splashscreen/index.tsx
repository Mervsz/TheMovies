import React, { Component } from "react"
import { View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationScreenProps } from "react-navigation";

interface IProps extends NavigationScreenProps{

}

interface IState{

}

export default class SplashScreen extends Component<IProps,IState>{
  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('@session_id')
      if(value !== null) {
        this.props.navigation.navigate("PrivateStack")
      }
      else{
        this.props.navigation.navigate("PublicStack")
      }
    } catch(e) {
        console.log(e)
        this.props.navigation.navigate("PublicStack")
    }
  }
  render(){
      return <View/>
  }
}