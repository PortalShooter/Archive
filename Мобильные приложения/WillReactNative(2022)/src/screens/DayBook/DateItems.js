import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback} from 'react-native';
import {month} from '../../assets/data/date';

const DateItems = ({navigation, item}) => {
  const date = new Date();
  const propsDate = new Date(item.day);

  const dateDay =
    propsDate - date === 0 ? (
      <Text style={styles.arrowText}>
        Сегодня,{' '}
        <Text style={styles.arrowBlueText}>
          {propsDate.getDate()} {month[propsDate.getMonth()]}{' '}
        </Text>
      </Text>
    ) : (
      <Text style={styles.arrowText}>
        <Text style={styles.arrowBlueText}>
          {propsDate.getDate()} {month[propsDate.getMonth()]}{' '}
        </Text>
      </Text>
    );
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate('CalendarWrapper')}>
      {dateDay}
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  arrowText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  arrowBlueText: {
    color: 'rgba(5, 185, 240, 1)',
    fontFamily: 'Nunito-Bold',
  },
});

export default DateItems;
