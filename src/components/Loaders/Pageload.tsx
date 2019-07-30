import React from "react";
import {   View, ActivityIndicator } from "react-native";
import theme from "fe-theme"

interface IProps {

}

export default function(props: IProps){
  return(
        <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}> 
            <ActivityIndicator size="large" color={theme.foreground}/> 
         </View>
  )
}