import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Home from '../../assets/img/Home';
import Book from '../../assets/img/Book';
import CalendarIcon from '../../assets/img/CalendarIcon';
import Statistical from '../../assets/img/Statistical';
import Star from '../../assets/img/Star';

const AdditionalNavigation = ({navigation}) => {
  const color = '#E5E5E5';
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          width: '100%',
          height: '100%',
          // backgroundColor: 'red',
          position: 'absolute',
          // top: 0,
          // left: 0,
        }}
      />
      <Text onPress={() => navigation.navigate('Главная')}>
        <Home fill={color} />
      </Text>
      <Text onPress={() => navigation.navigate('Планирование')}>
        <CalendarIcon fill={color} />
      </Text>
      <Text onPress={() => navigation.navigate('Дневник')}>
        <Book fill={color} />
      </Text>
      <Text onPress={() => navigation.navigate('Статистика')}>
        <Statistical fill={color} />
      </Text>
      <Text onPress={() => navigation.navigate('Тренинги')}>
        <Star fill={color} />
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    // height: 40,
    paddingTop: 35,
    paddingBottom: 25,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default AdditionalNavigation;
