import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const ItemsStat = ({completed_days, start_day, index, end_day}) => {
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'остября',
    'ноября',
    'декабря',
  ];

  const dateStart = new Date(start_day)
  const dateEnd = new Date(end_day)

  return (
    <View>
      <View style={styles.itemFlex}>
        <Text style={styles.executionResultText}>
          {index + 1} неделя <Text style={styles.greyText}>({dateStart.getDate() + ' ' + monthNames[dateStart.getMonth()]} - {dateEnd.getDate() + ' ' + monthNames[dateEnd.getMonth()]})</Text>
        </Text>
        <Text style={styles.executionResultGreenText}>{completed_days > 6? 6 : completed_days}/6</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  executionResultText: {
    fontSize: 12,
    fontFamily: 'Nunito-Light',
  },
  executionResultGreenText: {
    color: 'rgba(88, 209, 129, 1)',
    fontFamily: 'Nunito-Bold',
  },
  greyText: {
    color: '#A1A1A1',
  },
  itemFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 15,
  },
});

export default ItemsStat;
