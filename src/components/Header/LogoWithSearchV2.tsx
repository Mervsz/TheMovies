import React, { Component } from "react";
import { View, StyleSheet, Image, TextInputProps, TextStyle, TouchableOpacity, TextInput, ActivityIndicator, Animated } from "react-native";
import {  SansProText, CustomIcon } from "fe-components";
import theme from "fe-theme";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions"

interface IProps extends TextInputProps{
  style?: TextStyle
  menuPress: () => any
  title: string
  onBack: () => any
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
      this.expandAnim(DEVICE_WIDTH * .8).start()
      this.opacityAnim(0).start()
    }
    
    this.setState({isSearch:!isSearch})
  }

  render({ isSearch, isLoading } = this.state, { menuPress, title, onBack } = this.props){
  return(
    <View style={styles.header}>
      {/* Back with Title */}
      <CustomIcon onPress={onBack} name="arrow-left-solid" size={30} color={theme.textDark}/>
      
      <View style={styles.input}>
        <Animated.View style={{opacity: this.textOpacity}}>
          <SansProText dark size={24}> {title} </SansProText>
        </Animated.View>
      </View>
      


    {/* <Animated.View style={[styles.input_container, {width: this.expandValue}]}>

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
    </Animated.View> */}

    </View>
  )
  }
}

const styles = StyleSheet.create({
  input_container:{
    borderRadius: 10,
    position: 'absolute',
    right: DEVICE_WIDTH * .01,
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
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.foreground,
    borderBottomWidth: 2
  },
  icon:{
    tintColor: theme.foreground,
    width: 50,
    height: 50
  },
  list_icon:{
    tintColor: theme.foreground,
    width: 35,
    height: 35
  },
  input:{
    width:  DEVICE_WIDTH * .65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10

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
  back_arrow:{
    tintColor: theme.textDark,
    width: 30,
    height: 30
  }
})