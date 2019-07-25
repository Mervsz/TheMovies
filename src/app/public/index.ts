import { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./login";

export const PublicStack = createStackNavigator(
  {
    LoginScreen
  },
  {
    headerMode: 'none'
  })

