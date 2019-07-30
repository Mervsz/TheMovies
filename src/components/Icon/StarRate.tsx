import React, {Fragment} from "react";
import { Image, TouchableOpacity, TouchableOpacityProps, ViewStyle} from "react-native";
import { IconTypes } from "fe-models"
import { CustomIcon } from "..";

interface IProps extends TouchableOpacityProps, ViewStyle{
  starPress: (id?: number) => any,
  index?: number
  name: IconTypes,
  isActive: boolean
  size: number,
  color?: string
}

export default function(props: IProps){
  const {index, starPress, isActive} = props
  return <CustomIcon key={index} onPress={() => starPress(index)} name={ isActive ? 'full-star' : 'empty-star'} size={25} style={{margin:10}}/>
}