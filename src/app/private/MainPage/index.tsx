import React, { Component, Fragment } from "react";
import { StyleSheet, FlatList, ListRenderItem, Image, Platform } from "react-native";
import { SansProText, LogoWithSearch, Pageload } from "fe-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "fe-common/constants/variables/Dimensions";
import theme from "fe-theme";
import { NavigationScreenProps } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage"
import { getTrendingMovies, searchMovies } from "./helper";
import _ from "lodash"
import { IMovie } from "fe-models/movies";

interface IProps extends NavigationScreenProps{
  
}

interface IState{
  items: IMovie[]
  isLoading: boolean
  page: number,
  total_pages: number,
  toggleLogo: boolean
}

export default class MainPage extends Component<IProps,IState>{

  private onChangeTextDelayed: any

  private handleSearch: (text: string) =>  Promise<void>

  private searchValue: string

  private debounceToggle: any

  constructor(props: IProps){
    super(props)

    this.searchValue = ""

    this.handleSearch = async (val) =>{
      this.searchValue = val
      this.setState({isLoading: true, page: 1})
      if(val === ""){
        const response = await getTrendingMovies();
        this.setState({ items: response.data.results, isLoading: false, page: response.data.page, total_pages: response.data.total_pages})
      }
      else{
        const response = await searchMovies(val);
        this.setState({items: response.data.results, isLoading: false, page: response.data.page, total_pages: response.data.total_pages})
      }

    }

    this.onChangeTextDelayed = _.debounce(this.handleSearch, 1000);

    this.state ={
      items: [],
      isLoading: true,
      page: 1,
      total_pages: 1,
      toggleLogo: false
    }
  }

  async componentDidMount(){
    const response = await getTrendingMovies();
    this.setState({ items: response.data.results, isLoading: false, page: response.data.page, total_pages: response.data.total_pages})
  }


  handleLogout = async() => {
    try{
      AsyncStorage.removeItem('@session_id')
      this.props.navigation.navigate('PublicStack')
    }catch(err){
      alert('error')
    }
  }

  loadMore = async() => {
    const { items, page, total_pages } = this.state
    if(page <= total_pages){
      let page_increment = page + 1
      if(this.searchValue === ""){
        const response = await getTrendingMovies(page_increment);
          this.setState({items: items.concat(response.data.results), page: page_increment})
      }
      else{
        const response = await searchMovies(this.searchValue, page_increment);
        this.setState({items: items.concat(response.data.results), page: page_increment})
      }
    }
  }

  handleToggle = () => {
    if(this.state.toggleLogo === true){
      this.handleLogout()
      return
    }
    else{
      this.setState({toggleLogo: true})
    } 

    this.debounceToggle = setTimeout(() => this.setState({toggleLogo: false}), 2000)

   
  }

  keyExtractor = (item: any, index: number) => index.toString();

  renderItem: ListRenderItem<any> = ({item, index}) => (
    <TouchableOpacity style={styles.wrapper} onPress={() => this.props.navigation.navigate('DetailsViewScreen', {movie_id:item.id})}>
      <Image source={{uri: item.poster_path ?`http://image.tmdb.org/t/p/w185/${item.poster_path}` : `https://via.placeholder.com/185x320` }} style={styles.render_image} resizeMode='cover'/>
    </TouchableOpacity>
  );

  componentWillUnmount(){
    clearTimeout(this.debounceToggle)
  }

  render({ items, isLoading, toggleLogo } = this.state){
    return(
      <Fragment>
        <LogoWithSearch toggleLogo={!toggleLogo} onSearchChange={(val) => { this.onChangeTextDelayed(val)}} logoPress={this.handleToggle} menuPress={() => this.props.navigation.navigate('WatchListScreen')} title="Trending Movies"/>

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