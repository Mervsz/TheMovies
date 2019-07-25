import { Dimensions } from "react-native";

const Dim = Dimensions.get('screen')

export const DEVICE_WIDTH: number = Dim.width
export const DEVICE_HEIGHT: number = Dim.height
export const FONT_SCALE: number = Dim.fontScale