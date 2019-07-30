/**
 * @format
 */

import React from "react"
import {AppRegistry, SafeAreaView, Text} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

// // To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

function RN_App(){
  return(
    <SafeAreaView style={{flex:1}}>
      <App/>
    </SafeAreaView>
  )
}

AppRegistry.registerComponent(appName, () => RN_App);
