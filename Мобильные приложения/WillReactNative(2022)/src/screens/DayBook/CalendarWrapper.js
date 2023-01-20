import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AdditionalInformation from '../../components/AdditionalInformation';
import Header from '../../components/Header';
import DayBookCalendar from './DayBookCalendar';

const CalendarWrapper = props => {
  return (
    <Header>
      <ScrollView style={styles.wrapper}>
        <DayBookCalendar data={props.route.params} />
        <View style={styles.additional}>
          <AdditionalInformation
            text={['Дни, в которых есть заметки, выделены зеленым!']}
          />
        </View>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    height: '100%',
  },
  additional: {
    marginRight: 30,
    marginTop: 39,
  },
});

export default CalendarWrapper;
