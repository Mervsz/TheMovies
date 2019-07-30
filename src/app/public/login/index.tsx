import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { RoundedInput, LeafyButton, VectorLinesBG, SansProText } from "fe-components";
import theme from "fe-theme";
import { userLogin } from "./helper"
import { IUser, ICredentialTypes } from "fe-models/IUser";
import { NavigationScreenProps } from "react-navigation";
import { DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions";

interface IProps extends NavigationScreenProps{

}

interface IState extends IUser{
  isLoading: boolean
  showError: string | null
}

export default class Login extends Component<IProps,IState>{
  constructor(props: IProps){
    super(props);

    this.state ={
        name: '',
        password: '',

        isLoading: false,
        showError: null
    }
  }


  loginPress = async() => {
    try{
    const { name, password } = this.state
    this.setState({isLoading: true, showError: null})
    const response = await userLogin( name, password );
    if(response.status === "success"){
      this.setState({isLoading: false})
      this.props.navigation.navigate('PrivateStack')
      await AsyncStorage.setItem('@session_id', response.data.session_id)
      await AsyncStorage.setItem('@account_id', response.data.id)
    }
    else{
      this.setState({isLoading: false, showError: response.data.status_message})
    }
  }catch(e){}
  }

  updateInputField = (value: string, credential_type: ICredentialTypes) =>{

    switch(credential_type){
      case 'name':
        this.setState({name: value})
        break;
      case 'password':
        this.setState({password: value})
        break;
      default:
        break;
    }
  }

  render({ name, password, isLoading, showError } = this.state){
    return(
      <VectorLinesBG>
      <ScrollView contentContainerStyle={styles.container}>

          <Image style={styles.logo} source={require('fe-common/assets/img/app-logo.png')} resizeMode="contain" />

          <View style={styles.inputs}>
            <RoundedInput placeholder="User Name" value={name} onChangeText={(val) => this.updateInputField(val,'name')}/>
            <RoundedInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(val) => this.updateInputField(val,'password')}/>
          </View>

          <View style={styles.button}>
            <LeafyButton title="Login" onPress={this.loginPress} loading={isLoading}/>
          </View>

          {
            showError && <SansProText bold style={styles.error_message}>{showError}</SansProText>
          }

      </ScrollView>
      </VectorLinesBG>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: "transparent",
    paddingTop: DEVICE_WIDTH * .3,

    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  error_message:{
    color: theme.negative,
    width: DEVICE_WIDTH * .8,
    marginLeft: 5,
    marginTop: 20
  }
})
  