import React, { Component, Fragment } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import theme from "fe-theme";

interface IProps{
  children?: any
}

interface IState{

}

export default class VectorLines extends Component<IProps,IState>{

  private animPositionX: Animated.Value;

  private animPositionY: Animated.Value;
  
  private lineInterpolateX:(offset: number) => Animated.AnimatedInterpolation;

  private lineInterpolateY:(offset: number) =>  Animated.AnimatedInterpolation;

  private streamAnim: (toValue: number, toValueY: number, duration: number) =>  Animated.CompositeAnimation;
  
  constructor(props: IProps){
    super(props)

    this.animPositionX = new Animated.Value(0);

    this.animPositionY = new Animated.Value(0)

    this.lineInterpolateX = (offset: number) => this.animPositionX.interpolate({
      inputRange:[0,1],
      outputRange: [offset+300, offset - 100]
    })

    this.lineInterpolateY = (offset: number) => this.animPositionY.interpolate({
      inputRange:[0,1],
      outputRange: [offset-200, offset+200]
    })

    this.streamAnim = (toValueX: number, toValueY: number, duration: number) => {
      return Animated.parallel([
        Animated.timing(
          this.animPositionX,
          {
            toValue: toValueX,
            duration,
            easing: Easing.linear,
            useNativeDriver: true
          }
          ),
          Animated.timing(
            this.animPositionY,
            {
              toValue: toValueY,
              duration,
              easing: Easing.linear,
              useNativeDriver: true
            }
            ),
        ])
    }

    this.state = {
    }
  }


  loopAnimation(){
    this.animPositionX.setValue(0)
    this.animPositionY.setValue(0)
    this.streamAnim(2, 2, 50000)
    .start(() =>{ this.loopAnimation() })
  }

  componentDidMount(){
    this.loopAnimation()
  }

  render(){
    const { children } = this.props
    return(
      <Fragment>
        <Animated.Image style={[style.lines, { transform:[{translateX: this.lineInterpolateX(150)},{translateY: this.lineInterpolateY(-500)}, {scale:0.3}, {rotate:'-5deg'}]} ]} source={require('fe-common/assets/img/linee.png')}/>
        <Animated.Image style={[style.lines, { transform:[{translateX: this.lineInterpolateX(0)},{translateY: this.lineInterpolateY(0)}, {scale:0.3}, {rotate:'-5deg'}]} ]} source={require('fe-common/assets/img/linee.png')}/>
        <Animated.Image style={[style.lines, { transform:[{translateX: this.lineInterpolateX(10)},{translateY: this.lineInterpolateY(400)}, {scale:0.3}, {rotate:'-5deg'}]} ]} source={require('fe-common/assets/img/linee.png')}/>
        <Animated.Image style={[style.lines, { transform:[{translateX: this.lineInterpolateX(-50)},{translateY: this.lineInterpolateY(300)}, {scale:0.3}, {rotate:'-5deg'}]} ]} source={require('fe-common/assets/img/linee.png')}/>
        {children}
      </Fragment>
    )
  }
}

const style = StyleSheet.create({
  lines:{
    position: 'absolute',
    tintColor: theme.foreground
  }
})