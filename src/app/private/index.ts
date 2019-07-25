import { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainPageScreen from "./MainPage"
import DetailsViewScreen from "./DetailsView"
import WatchListScreen from "./WatchList"

export const PrivateStack  = createStackNavigator(
  {
    MainPageScreen,
    DetailsViewScreen,
    WatchListScreen,
  },
  {
    headerMode: 'none'
  })

