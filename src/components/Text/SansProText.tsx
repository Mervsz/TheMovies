import React from "react";
import { Text, TextStyle, TextProps } from "react-native";

interface IProps extends TextProps{
  children?: any,
  bold?: boolean,
  light?: boolean,
  dark?: boolean,
  regular?: boolean,
  style?: TextStyle,
  size?: number

}

export default function SansProText(props: IProps){
  const { children, size } = props

  function textFamily(): string{

    if(props.bold){
      return "SourceSansPro-Bold"
    }
    else if(props.light){
      return "SourceSansPro-ExtraLight"
    }
    else if(props.dark){
      return "SourceSansPro-Black"
    }
    else{
      return "SourceSansPro-Regular"
    }
  } 

  return(
    <Text  {...props} style={[ {fontFamily: textFamily(), fontSize: size } , props.style ]}>
      {children}
    </Text>
  )
}