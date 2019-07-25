import React, { Component, Fragment } from "react";
import { View, StyleSheet, FlatList, ImageRequireSource, ListRenderItem, Image, Dimensions } from "react-native";
import { SansProText, LogoWithSearch } from "fe-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PHOTO_LIST } from "fe-common/constants/mocks/photolist";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions";
import theme from "fe-theme";
import { NavigationScreenProps } from "react-navigation";

interface IProps extends NavigationScreenProps{
  
}

interface IState{

}

export default class MainPage extends Component<IProps,IState>{
  constructor(props: IProps){
    super(props)

    this.state ={

    }
  }

  keyExtractor = (item: any, index: number) => index.toString();

  renderItem: ListRenderItem<number> = ({item, index}) => (
    <TouchableOpacity style={styles.render_image} onPress={() => this.props.navigation.navigate('DetailsViewScreen')}>
      <Image source={item} style={styles.render_image} resizeMode='cover'/>
    </TouchableOpacity>
  );

  render(){
    return(
      <Fragment>
        <LogoWithSearch menuPress={() => this.props.navigation.navigate('WatchListScreen')} title="Trending Movies"/>
        <FlatList
          data={PHOTO_LIST}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{paddingVertical: DEVICE_HEIGHT * .01}}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          columnWrapperStyle={styles.view_list}
          />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  view_list:{
    justifyContent: 'space-evenly',
    
    marginVertical: 5
  },
  render_image:{
    width: DEVICE_WIDTH *.3,
    height: DEVICE_HEIGHT * .3,
    backgroundColor: theme.foreground
  }
})