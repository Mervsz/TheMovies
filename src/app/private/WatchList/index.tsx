import React, { Component, Fragment } from "react";
import { StyleSheet, FlatList, ListRenderItem, Image, Platform } from "react-native";
import { SansProText, LogoWithSearchV2, Pageload } from "fe-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions";
import theme from "fe-theme";
import { NavigationScreenProps, NavigationEvents } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage"
import { getWatchList } from "./helper";
import _ from "lodash"

interface IProps extends NavigationScreenProps{
  
}

interface IState{
  items: any[]
  isLoading: boolean
  page: number,
  total_pages: number
}

export default class WatchList extends Component<IProps,IState>{

  constructor(props: IProps){
    super(props)

    this.state ={
      items: [],
      isLoading: true,
      page: 1,
      total_pages: 1
    }
  }

  onMount= async () => {
    const response = await getWatchList();
    console.log(response, "watchlist")
    this.setState({ items: response.data.results, isLoading: false, page: response.data.page, total_pages: response.data.total_pages})
  }


  handleLogout = async() => {
    try{
      AsyncStorage.removeItem('@session_id')
      // this.props.navigation.navigate('PublicStack')
    }catch(err){
      alert('error')
    }
  }

  loadMore = async() => {
    const { items, page, total_pages } = this.state
    if(page < total_pages){
      let page_increment = page + 1
        const response = await getWatchList(page_increment);
          this.setState({items: items.concat(response.data.results), page: page_increment})
    }
  }

  

  keyExtractor = (item: any, index: number) => index.toString();

  renderItem: ListRenderItem<any> = ({item, index}) => (
    <TouchableOpacity style={styles.wrapper} onPress={() => this.props.navigation.navigate('DetailsViewScreen', {movie_id:item.id})}>
      <Image source={{uri: `http://image.tmdb.org/t/p/w185/${item.poster_path}`}} style={styles.render_image} resizeMode='cover'/>
    </TouchableOpacity>
  );

  render({ items, isLoading } = this.state){
    return(
      <Fragment>
        <NavigationEvents onWillFocus={this.onMount} onDidBlur={() => this.setState({isLoading: true})}/>
        <LogoWithSearchV2 menuPress={() => alert('test')} title="Watch List" onBack={() => this.props.navigation.goBack()}/>

        {
          isLoading
          ? <Pageload />
          : <FlatList
              data={items}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              contentContainerStyle={{paddingVertical: DEVICE_HEIGHT * .01}}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              columnWrapperStyle={styles.view_list}
              onEndReached  = {this.loadMore}
              onEndReachedThreshold = { Platform.OS == "ios" ? 0.6 : 0.6}
              // refreshing    = {refreshing}
              // ListFooterComponent = { current_page !== last_page && <Spinner size="small" style={{ height: SCALER.scale(40), paddingTop: SCALER.scale(10) }} /> }
          />
        }
        
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  view_list:{
    justifyContent: 'flex-start', 
    marginVertical: 5,
    marginHorizontal: DEVICE_WIDTH * .02
  },
  render_image:{
    width: DEVICE_WIDTH *.3,
    height: DEVICE_HEIGHT * .3,
    // backgroundColor: theme.foreground
  },
  wrapper:{
    width: DEVICE_WIDTH *.3,
    height: DEVICE_HEIGHT * .3,
    marginHorizontal: DEVICE_WIDTH * .01
    // backgroundColor: theme.foreground
  }


})