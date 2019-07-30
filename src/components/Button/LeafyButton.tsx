import React from "react";
import { TouchableOpacity, View, StyleSheet, TouchableOpacityProps, ActivityIndicator } from "react-native";
import { SansProText } from "fe-components";
import theme from "fe-theme";

interface IProps extends TouchableOpacityProps{
  title?: any
  loading?: boolean
}

export default function(props: IProps){
  return(
    <TouchableOpacity style={styles.button} {...props}>
      {
        !props.loading 
        ?  <SansProText bold style={{color: theme.background, fontSize: 20}}>
              {props.title}
          </SansProText>
        : <ActivityIndicator size="large" color={theme.background}/>

    }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: theme.foreground,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 10
  }
})