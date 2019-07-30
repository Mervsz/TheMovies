import React, { Component, Fragment } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import { SansProText, CustomIcon, Pageload, ReviewItem, LeafyButton, StarRate } from "fe-components";
import theme from "fe-theme";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "fe-common/constants/variables/Dimensions"
import { NavigationScreenProps } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { getMovieDetails, getMovieReviews, addToWatchlist, getMovieRate, rateMovie } from "./helper";
import { IMovie, IReviews } from "fe-models/movies";

interface IProps extends NavigationScreenProps{

}

interface IState{
  movie: IMovie | null
  reviews: IReviews[] | null
  isLoading: boolean
  isRate: boolean
  ratePosting: boolean
  myRating: number
  tempRating: number
}

export default class DetailsView extends Component<IProps,IState>{

  constructor(props: IProps){
    super(props);

    this.state = {
      movie: null,
      isLoading: true,
      reviews: null,
      isRate: false,
      myRating: 0,
      ratePosting: false,
      tempRating: 0
    }
  }

 async componentDidMount(){
    const movie_id = this.props.navigation.getParam("movie_id")
    const movie = await getMovieDetails(movie_id)
    const reviews = await getMovieReviews(movie_id)
    const rate = await getMovieRate(movie_id)

    this.setState({ movie: movie.data, reviews: reviews.data.results, isLoading: false, myRating: rate.data.rating, tempRating: rate.data.rating})
  }

  buttonToggle = async () => {
    const isAdded: boolean = this.state.movie ? this.state.movie.isAdded : false

    this.setState((prevState: IState) => {
      return{
        ...prevState,
        movie:{
          ...prevState.movie,
          isAdded: !isAdded
        }
      }
  })

    const movie_id = this.props.navigation.getParam("movie_id")
    const response = await addToWatchlist(movie_id, isAdded)

  }

  openRateModal = () =>{
    this.setState({isRate: true})
  }

  generateStars = () => {
    const { tempRating } = this.state
    let count = 1
    let temp = []
    do{
      let checkActive = count <= tempRating ? true : false
      temp.push(
        <StarRate index={count} key={count} starPress={(val) => this.setState({tempRating: val || 0})} name='empty-star' size={25} 
        style={{margin:10}} isActive={checkActive}/>
      )
      count++;
    }while(count <= 10)

    return(
        <View style={styles.stars_container}>
          {temp}
        </View>
    )
  }

  renderGenre = (genre: any[]) => {
    let count = 0;
    let temp = []
    if(genre.length <= 0) return
    do{
      temp.push(
      <SansProText bold key={count}>
          {genre[count].name}{count+ 1 === genre.length ? "  ": ", "}
      </SansProText>)
      count++;
    }while(count < genre.length)
    
    return(
     <View style={{flexDirection: "row"}}>
      {temp}
    </View>)
  }

  renderDetails = (movie: IMovie, reviews: IReviews[]) => {
    return(
       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.main_content}>

          <View style={styles.icon_set}>
            <CustomIcon style={{marginTop:10}} onPress={() => this.props.navigation.goBack()} name='arrow-left-solid' size={30} color={theme.textDark}/>
        
          
              <View style={styles.detail_wrapper}>
              
                <View style={styles.icon_text}>
                  <CustomIcon onPress={() => {}} name='full-heart' size={30} />
                  <SansProText>{movie.popularity}</SansProText>
                  <SansProText>Popularity</SansProText>
                </View>

                <View style={styles.icon_text}>
                  <CustomIcon onPress={() => {}} name='full-star' size={30} />
                  <SansProText>{movie.vote_average}/10</SansProText>
                  <SansProText>{movie.vote_count}</SansProText>
                </View>
                
                <View style={styles.icon_text}>
                  <CustomIcon onPress={this.openRateModal} name={ this.state.myRating > 0  ? 'full-star' : 'empty-star'} size={30} />
                  <SansProText>{this.state.myRating || "Rate"}</SansProText>
                  <SansProText>Your Rating</SansProText>
                </View>

              </View>
        
            </View>

            <View  style={styles.full_image}>
              <Image source={{uri: movie.poster_path ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}` : `https://via.placeholder.com/185x320`}} style={{width:'100%', height: DEVICE_HEIGHT * .6, borderBottomLeftRadius: 50}}  resizeMode='stretch'/>
            
            <View style={styles.watchlist_button}>
              {/* <SansProText style={{marginRight: 5, color: theme.negative}} bold size={16}>Remove to Watchlist</SansProText> */}
              <TouchableOpacity style={ movie.isAdded ? styles.remove_badge : styles.add_badge} onPress={this.buttonToggle}>
                  <Image source={ movie.isAdded ? require("fe-common/assets/img/minus.png") : require("fe-common/assets/img/plus.png")} style={styles.badge_icon} resizeMode='contain'/>
                </TouchableOpacity>
            </View>

            </View>

          </View>

          {/* Main Description */}
          <View style={styles.description}>
            <SansProText dark style={styles.title}>
              {movie.title}
            </SansProText>
            <SansProText bold>
              {movie.release_date.split("-")[0]}
            </SansProText>

              {this.renderGenre(movie.genres)}

            <SansProText style={{marginTop:5}}>
              {movie.overview}
            </SansProText>

          </View>

            {/* Reviews */}
            <View style={styles.reviews_list}>
              <SansProText dark size={20}>
                Reviews ({reviews.length})
              </SansProText>

              {this.renderReviews(reviews)}

            </View>

        </ScrollView>

      )
    
  }

  renderReviews = (reviews: IReviews[]) => {
    let count = 0;
    let temp = []
    if(reviews.length <= 0) return
    do{
      temp.push(<ReviewItem key={count} reviews={reviews[count]}/>)
      count++;
    }while(count < reviews.length)
    
    return temp
  }

  submitRating = async() => {
    this.setState({ratePosting: true})
    const movie_id = this.props.navigation.getParam("movie_id")
    const { myRating } = this.state
    await rateMovie(movie_id, myRating)
    this.setState({isRate: false, ratePosting: false, myRating: this.state.tempRating})
  }

  render({ movie, reviews, isLoading, isRate, myRating, ratePosting, tempRating} = this.state){
    return(
         <Fragment>
           <Modal visible={isRate} transparent={true} animationType="fade">
             <View style={styles.rate_content}>
                <View style={styles.rate_view}>
                <CustomIcon style={{position: 'absolute', top:10, right: 10}} onPress={() => this.setState({isRate: false})} name='cancel' size={25} color={theme.negative}/>
                  <SansProText bold size={18}>Tap Stars!</SansProText>
                    {this.generateStars()}
                  <View style={styles.rate_button}>
                    <LeafyButton title="Rate" onPress={this.submitRating} loading={ratePosting}/>
                  </View>
                  
                </View>
             </View>
           </Modal>
            {
              (isLoading && movie === null)
              ? <Pageload/>
              : this.renderDetails(movie, reviews)
            }
        </Fragment>
        
    )
  }
}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    paddingBottom: 15
  },
  main_content:{
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: "row"
  },
  description:{
    marginTop: 15,
    marginHorizontal: 15,
    borderBottomColor: theme.foreground,
    borderBottomWidth: 2,
    paddingBottom: 10
  },
  full_image:{
    width: DEVICE_WIDTH *.8,
    height: DEVICE_HEIGHT *.6,
    backgroundColor: theme.foreground,
    borderBottomLeftRadius: 50,
    borderLeftColor: theme.foreground,
    borderBottomColor: theme.foreground,
    borderBottomWidth: 10,
    borderLeftWidth: 10
  },
  add_badge:{
    width:50,
    height:50,
    borderRadius: 50,
    borderColor: theme.background,
    borderWidth: 3,
    backgroundColor:theme.positive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove_badge:{
    width:50,
    height:50,
    borderRadius: 50,
    borderColor: theme.background,
    borderWidth: 3,
    backgroundColor:theme.negative,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchlist_button:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: -30, 
    right: 30
  },
  icon_set:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '20%'
  },
  icon:{
    width: 35,
    height: 35,
  },
  badge_icon:{
    width: 25,
    height: 25,
    tintColor: theme.background
  },
  title:{
    fontSize: 30,
    color: theme.textDark
  },
  icon_text:{
    alignItems: 'center',
    marginVertical: 20
  },
  detail_wrapper:{
    justifyContent:'center',
    height: DEVICE_HEIGHT *.6 - 50
  },
  review:{

  },
  reviews_list:{
    marginTop: 15,
    marginHorizontal: 15
  },
  rate_content:{
    flex: 1,
    backgroundColor:`rgba(88, 84, 84, 0.6)`,
    justifyContent: "center",
    alignItems: "center"
  },
  rate_view:{
    height: DEVICE_HEIGHT * .35,
    width: DEVICE_WIDTH * .7,
    backgroundColor: theme.background,
    borderColor: theme.foreground,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  stars_container:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rate_button:{
    width:'80%',
  }
})