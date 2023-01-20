import React, {useRef} from 'react';
import {Animated, View, StyleSheet, Image, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Timer = props => {
  const value = useRef(new Animated.Value(0)).current;

  const startAnime = (n = true) => {
    const anim = Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration: props.speed * 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
    if (n) {
      anim.start(() => {
        value.setValue(0);
      });
    } else {
      anim.stop(() => {
        value.setValue(0);
      });
    }
  };
  if (props.start) {
    startAnime();
  } else {
    value.setValue(0);
    startAnime(false);
  }

  const interpolateRotating = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '450deg'],
  });
  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <View style={styles.wrapper}>
      <Image style={styles.firstRing} source={require('./FirstRing.jpg')} />
      <Animated.View style={animatedStyle}>
        <Pen />
      </Animated.View>
    </View>
  );
};

const Pen = () => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#05B9F0', '#fff']}
        style={styles.linearGradient}>
        <View style={styles.cutPen} />
        <View style={styles.circleWhite} />
        <View style={styles.line} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  firstRing: {
    position: 'absolute',
  },
  linearGradient: {
    width: 216,
    height: 216,
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleWhite: {
    width: 190,
    height: 190,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  cutPen: {
    backgroundColor: '#fff',
    width: '100%',
    height: 190,
    position: 'absolute',
    bottom: '50%',
  },
  line: {
    width: '50%',
    height: 2,
    backgroundColor: '#05B9F0',
    position: 'absolute',
    left: 0,
  },
});

export default Timer;
