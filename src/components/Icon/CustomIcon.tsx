import React from "react";
import { Image, TouchableOpacity, TouchableOpacityProps, ViewStyle} from "react-native";
import { IconTypes } from "fe-models"

interface IProps extends TouchableOpacityProps, ViewStyle{
  onPress: () => any
  name: IconTypes,
  size: number,
  color?: string
}

export default function(props: IProps){
  const { size, color, name} = props
  const path = checkIcon(name)
  return(
    <TouchableOpacity {...props}>
      <Image style={[{width: size, height: size, tintColor: color}]} 
      source={path} resizeMode="contain"/>
     </TouchableOpacity>
  )
}

function checkIcon(name: IconTypes) : any{
  switch(name){
    case 'app-icon':
      return require('fe-common/assets/img/app-icon.png')
    case 'app-logo':
      return require('fe-common/assets/img/app-logo.png')
    case 'arrow-left-solid':
      return require('fe-common/assets/img/arrow-left-solid.png')
    case 'checked':
      return require('fe-common/assets/img/checked.png')
    case 'plus':
      return require('fe-common/assets/img/plus.png')
    case 'search':
      return require('fe-common/assets/img/search.png')
    case 'th-list-solid':
      return require('fe-common/assets/img/th-list-solid.png')
    case 'full-heart':
      return require('fe-common/assets/img/full-heart.png')
    case 'full-star':
      return require('fe-common/assets/img/full-star.png')
    case 'empty-star':
      return require('fe-common/assets/img/empty-star.png')
    default:
      return  require('fe-common/assets/img/app-icon.png')

  }
}
