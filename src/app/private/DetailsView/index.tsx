import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SansProText, CustomIcon } from "fe-components";
import theme from "fe-theme";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "fe-common/constants/variables/Dimensions"
import { NavigationScreenProps } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

interface IProps extends NavigationScreenProps{

}

interface IState{

}

export default class DetailsView extends Component<IProps,IState>{
  constructor(props: IProps){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.main_content}>

          <View style={styles.icon_set}>

            
           <CustomIcon style={{marginTop:10}} onPress={() => this.props.navigation.goBack()} name='arrow-left-solid' size={30} color={theme.textDark}/>
            
            
            <View style={styles.detail_wrapper}>
            <View style={styles.icon_text}>
              <CustomIcon onPress={() => alert('test')} name='full-star' size={30} />
              <SansProText>6.8/10</SansProText>
              <SansProText>2718</SansProText>
            </View>
            
            <View style={styles.icon_text}>
              <CustomIcon onPress={() => alert('test')} name='empty-star' size={30} />
              <SansProText>Rate</SansProText>
              <SansProText>Your Rating</SansProText>
            </View>

            <View style={styles.icon_text}>
              <CustomIcon onPress={() => alert('test')} name='full-heart' size={30} />
              <SansProText>148,987</SansProText>
              <SansProText>Popularity</SansProText>
            </View>
            </View>
            
            
            {/* <Image source={require("fe-common/assets/img/arrow-left-solid.png")} style={styles.icon} resizeMode='contain'/>
            <Image source={require("fe-common/assets/img/full-star.png")} style={styles.icon} resizeMode='contain'/>
            <Image source={require("fe-common/assets/img/full-heart.png")} style={styles.icon} resizeMode='contain'/> */}
          </View>

          <View  style={styles.full_image}>
            <Image source={require("fe-common/assets/img/movie-image.jpg")} style={{width:'100%', height: DEVICE_HEIGHT * .6, borderBottomLeftRadius: 50}}  resizeMode='cover'/>
          
           <View style={styles.watchlist_button}>
             {/* <SansProText style={{marginRight: 5, color: theme.negative}} bold size={16}>Remove to Watchlist</SansProText> */}
            <TouchableOpacity style={styles.add_badge}>
                <Image source={require("fe-common/assets/img/plus.png")} style={styles.badge_icon} resizeMode='contain'/>
              </TouchableOpacity>
           </View>

          </View>
        </View>
        
        {/* Main Description */}
        <View style={styles.description}>
          <SansProText dark style={styles.title}>
            Spider Man: Far From Home afsdasdf
          </SansProText>
          <SansProText bold>
            2019
          </SansProText>
          <SansProText bold>
            Action, Adventure, Comedy
          </SansProText>
          <SansProText bold>
            Lorem Ipsum, Lorem Ipsum, Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </SansProText>
        </View>

        {/* Reviews */}
        <View style={styles.reviews_list}>
          <SansProText dark size={20}>
            Reviews (20)
          </SansProText>

          <SansProText bold>
            Sample Name
          </SansProText>

          <SansProText bold>
            Lorem Ipsum, Lorem Ipsum, Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </SansProText>
        </View>
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
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
    backgroundColor:theme.foreground,
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
  }
})