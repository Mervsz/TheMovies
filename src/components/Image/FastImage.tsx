import React from "react";
import FastImage, { FastImageProperties } from "react-native-fast-image";
import { ImageStyle } from "react-native";

interface IProps{
  source: any,
  style?: ImageStyle,
  resizeMode: any
}

export default function(props: IProps){
  return <FastImage {...props}/>
}