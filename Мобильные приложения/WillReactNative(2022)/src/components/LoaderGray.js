import React from 'react';
import {
  View,
} from 'react-native';
import LottieView from "lottie-react-native";

const LoaderGray = () => {
  return (
    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        style={{width: 250, height: 250}}
        source={require('../assets/loader.json')}
        autoPlay
        loop
      />
    </View>
  )
}

export default LoaderGray;
