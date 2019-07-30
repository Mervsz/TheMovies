import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { PrivateStack } from "./private";
import { PublicStack } from "./public";
import SplashScreen from "./splashscreen";
import AsyncStorage from "@react-native-community/async-storage"

export const Root = createSwitchNavigator(
  {
    SplashScreen,
    PublicStack,
    PrivateStack
  },
  {
    initialRouteName: 'SplashScreen'
  }
  )

export default createAppContainer(Root);