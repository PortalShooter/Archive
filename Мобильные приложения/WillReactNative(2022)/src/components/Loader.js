import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, Text, View} from 'react-native';
import logo from '../assets/img/logoLoader.png'

export const Loader = () => {
  const [width, setWidth] = useState(130)
  const [height, setHeight] = useState(130)
  const [opacity, setOpacity] = useState(0)


  useEffect(() => {
    let id
    if (width < 200) {
      id = setInterval(() => {
        setHeight(height + 0.2)
        setWidth(width + 0.2)
        setOpacity(opacity + 0.03)
      }, 20);
    }
    return () => {
      clearInterval(id);
    };
  }, [width]);

  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#58D181', '#05B9F0']}
      style={styles.linearGradient}>
      <View style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={logo} style={{width: width, height: height}}/>
      </View>
      <Text style={[styles.textBig, {opacity: opacity}]} >НА ПОРОГЕ</Text>
      {/*<Text style={styles.text}>Объединение молодежного саморазвития</Text>*/}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    paddingTop: '50%',
    alignItems: 'center',
    paddingHorizontal: '15%',
  },
  textBig: {
    color: '#fff',
    fontFamily: 'Nunito-Light',
    fontSize: 36,
    marginBottom: 4,
    marginTop: 60
  },
  text: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    fontSize: 16,
  },
});
