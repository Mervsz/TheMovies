import { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { PrivateStack } from "./private";
import { PublicStack } from "./public";

export const Root = createSwitchNavigator({
  // PublicStack,
  PrivateStack
})

export default createAppContainer(Root);