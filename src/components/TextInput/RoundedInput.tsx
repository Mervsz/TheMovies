import React from "react"
import { TextInput, StyleSheet, TextStyle, TextInputProps } from "react-native";
import theme from "fe-theme";

interface IProps extends TextInputProps{
  style?: TextStyle
}

export default function(props: IProps){
  return(
    <TextInput
      style={styles.input}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input:{
    borderRadius: 10,
    borderColor: theme.foreground,
    borderWidth: 3.5,
    width:'100%',
    height: 45,
    fontFamily: 'SourceSansPro-Bold',
    color: theme.textDark,
    paddingHorizontal: 15,
    textAlign: 'center'
  }
})