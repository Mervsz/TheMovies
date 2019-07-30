import React, { Component } from "react"
import { TouchableOpacity, StyleSheet } from "react-native";
import { SansProText } from "fe-components"
import { IReviews } from "fe-models/movies";
import theme from "fe-theme";

interface IProps{
  reviews: IReviews
}

interface IState{
  isExpanded: boolean
}

export default class ReviewItem extends Component<IProps,IState>{
  constructor(props: IProps){
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  handleExpandingTouch = () => {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render({ reviews } = this.props, { isExpanded } = this.state){
    return(
      <TouchableOpacity onPress={this.handleExpandingTouch} style={styles.container}>
      <SansProText bold style={{marginBottom: 5}}>
          {reviews.author}
      </SansProText>

      <SansProText numberOfLines={isExpanded ? 0 : 3}>
          {reviews.content}
      </SansProText>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingVertical: 5,
    marginTop: 2,
    borderBottomColor: theme.foreground,
    borderBottomWidth: 1
  }
})