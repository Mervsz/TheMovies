import React, { Component } from "react"
import { View, TextInput, Image, StyleSheet, TextStyle, TextInputProps, ActivityIndicator } from "react-native";
import theme from "fe-theme";

interface IProps extends TextInputProps{
  style?: TextStyle
}

interface IState{
  isLoading: boolean
}

export default class SearchInput extends Component<IProps,IState>{
  constructor(props: IProps){
    super(props);

    this.state={
      isLoading: false
    }
  }

  render({isLoading} = this.state){
  return(
    <View style={styles.container}>
      <Image source={require('fe-common/assets/img/search.png')} style={styles.search} resizeMode='stretch'/>

       <TextInput
        style={styles.input}
        {...this.props}
        />

        {
          isLoading
          ?  <ActivityIndicator color={theme.foreground} size={16}/>
          : null
        }
       
    </View>
   
  )
  }
}

const styles = StyleSheet.create({
  container:{
    borderRadius: 10,
    borderColor: theme.foreground,
    borderWidth: 3.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'100%',
    height: 40,
  },
  input:{
    width:'75%',
    height: 45,
    fontFamily: 'SourceSansPro-Bold',
    color: theme.textDark,
    paddingLeft: 5
  },
  search:{
    height: 25,
    width: 25,
    tintColor: theme.foreground,
    marginHorizontal: 5,
  }
})