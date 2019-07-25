import React, { Component } from "react";
import { View, StyleSheet, TextInputProps, TextStyle, TouchableOpacity, TextInput, ActivityIndicator, Animated } from "react-native";
import {  SansProText, CustomIcon } from "fe-components";
import theme from "fe-theme";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions"

interface IProps extends TextInputProps{
  style?: TextStyle
  menuPress: () => any
  title: string
}

interface IState{
  isSearch: boolean
  isLoading: boolean
}

export default class LoginWithSearch extends Component<IProps,IState>{

  private expandValue: Animated.Value;

  private textOpacity: Animated.Value;

  private expandAnim: (toValue: number) => Animated.CompositeAnimation;

  private opacityAnim: (toValue: number ) => Animated.CompositeAnimation;

  private refInput: TextInput | null;

  constructor(props: IProps){
    super(props);

    this.expandValue = new Animated.Value(40);

    this.textOpacity = new Animated.Value(1)

    this.refInput =null

    this.expandAnim = (toValue) => Animated.spring(this.expandValue, {
      toValue,
      speed: 10,
    })

    this.opacityAnim = (toValue) => Animated.timing(this.textOpacity, {
      toValue,
      duration: 200,
      useNativeDriver: true
    })
    this.state ={
      isSearch: false,
      isLoading: false
    }
  }

  componentDidUpdate(){
    const { isSearch } = this.state
    if(isSearch){
      if(this.refInput) this.refInput.focus()
    }
  }

  expand(){
    const { isSearch } = this.state
    if(isSearch){
      this.expandAnim(40).start()
      this.opacityAnim(1).start()
      
    }
    else{
      this.expandAnim(DEVICE_WIDTH * .7).start()
      this.opacityAnim(0).start()
    }
    
    this.setState({isSearch:!isSearch})
  }

  render({ isSearch, isLoading } = this.state, { menuPress, title } = this.props){
  return(
    <View style={styles.header}>
      {/* Main Logo */}
      <CustomIcon  onPress={() => alert('Modal Logout')} name="app-icon" size={45} color={theme.foreground}/>
      
      <View style={styles.input}>
        <Animated.View style={{opacity: this.textOpacity}}>
          <SansProText dark size={24}> {title} </SansProText>
        </Animated.View>
      </View>

      {/* Search Animation */}
      <Animated.View style={[styles.input_container, {width: this.expandValue}]}>

      <CustomIcon style={styles.search} onPress={() => this.expand()} name="search" size={25} color={theme.foreground}/>
        {
          isSearch
          ? <TextInput
          ref={(c) => this.refInput = c}
          style={styles.custom_input}
          placeholder="Search"
          />
          : null
        }
        {
          isLoading
          ?  <ActivityIndicator color={theme.foreground} size={16}/>
          : null
        }
      </Animated.View>

      {/* WatchList */}
      <CustomIcon onPress={menuPress} name="th-list-solid" size={30} color={theme.foreground}/>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  input_container:{
    borderRadius: 10,
    position: 'absolute',
    right: DEVICE_WIDTH * .1,
    borderColor: theme.foreground,
    borderWidth: 3.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  header:{
    width: DEVICE_WIDTH * .95,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.foreground,
    borderBottomWidth: 2
  },
  input:{
    width:  DEVICE_WIDTH * .7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  search:{
    width:25,
    height: 25,
    tintColor: theme.foreground,
    marginHorizontal: 5,
  },
  custom_input:{
    width: DEVICE_WIDTH * .7,
    height: 45,
    fontFamily: 'SourceSansPro-Bold',
    color: theme.textDark,
    paddingLeft: 5
  },
})