import React, { useEffect } from "react";
import {StyleSheet, Text, View} from 'react-native';
import {DraggableCalendar} from './DraggableCalendar';
import {month} from '../../assets/data/date';

const Plan = ({week, daysOfWeek, setDataDaysTime, DataDaysTime, internet, setActiveWeek, arrFirstDay}) => {
  const date = new Date(arrFirstDay[week - 1])
  Date.prototype.addDays = function () {
    const date = new Date(arrFirstDay[week - 1])
    date.setDate(date.getDate() + 6);
    return date;
  };
  const firstDay = date
  const lastDay = date.addDays();

  useEffect(() => {
    if (date >= firstDay && new Date >= firstDay) {
      setActiveWeek(week - 1)
    }
  }, [firstDay]);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 13,
        }}>
        <Text
          style={{
            color: '#58D181',
            fontFamily: 'Nunito-SemiBold',
            marginRight: 6,
          }}>
          {week} неделя:
        </Text>
        <Text style={{color: '#B7B7B7', fontFamily: 'Nunito-SemiBold'}}>
          {firstDay.getDate()} {month[firstDay.getMonth()]} -{' '}
          {lastDay.getDate()} {month[lastDay.getMonth()]}
        </Text>
      </View>
      <View style={styles.wrapperPlan}>
        <View style={styles.daysWeek}>
          <Text style={styles.dayText}>ПН</Text>
          <Text style={styles.dayText}>ВТ</Text>
          <Text style={styles.dayText}>СР</Text>
          <Text style={styles.dayText}>ЧТ</Text>
          <Text style={styles.dayText}>ПТ</Text>
          <Text style={styles.dayText}>СБ</Text>
          <Text style={[styles.dayText, {color: '#868686'}]}>ВС</Text>
        </View>
        <View
          style={{
            backgroundColor: '#F8F8F8',
            position: 'absolute',
            width: 40,
            height: '98.5%',
            top: 8,
            right: 6,
            borderRadius: 50,
            zIndex: 0,
          }}
        />
        <View>
          <DraggableCalendar
            daysOfWeek={daysOfWeek}
            firstDay={firstDay}
            setDataDaysTime={setDataDaysTime}
            DataDaysTime={DataDaysTime}
            internet={internet}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperPlan: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dayText: {
    fontFamily: 'Nunito-Bold',
    color: '#05B9F0',
  },
  daysWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 12,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    marginBottom: 10,
    zIndex: 20,
    position: 'relative',
  },
  buttonText: {
    height: 30,
    width: 30,
    alignItems: 'center',
    color: '#B5B5B5',
    fontSize: 25,
  },
});

export default Plan;
