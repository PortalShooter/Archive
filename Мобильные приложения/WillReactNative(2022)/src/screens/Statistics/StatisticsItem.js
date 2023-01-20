import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasksStatistics} from '../../redux/homePage-reducer';
import ItemsStat from './ItemsStat';
import {declOfNum} from '../../components/HelperFunctions';

const StatisticsItem = () => {
  const tasksActual = useSelector(state => state.Auth.tasksActual);
  const statistics = useSelector(state => state.HomePage.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksStatistics(tasksActual.id));
  }, [dispatch]);

  const [initialArr, setInitialArr] = useState([])

  useEffect(() => {
    if (new Date() - new Date(statistics.weeks[statistics.weeks.length - 1].end_day).setDate(new Date(statistics.weeks[statistics.weeks.length - 1].end_day).getDate() - 1) >= 0 || statistics.weeks[statistics.weeks.length - 1].completed_days === 6) {
      return setInitialArr(statistics.weeks)
    } else if (new Date() - new Date(statistics.weeks[statistics.weeks.length - 1].end_day) <= 0) {
      return setInitialArr(statistics.weeks ? statistics.weeks.filter(f => new Date(f.end_day) <= new Date() ? f : null) : [])
    }
  }, [])


  const itemStat = initialArr.map((item, index) => (
    <ItemsStat
      key={index}
      index={index}
      completed_days={item.completed_days}
      start_day={item.start_day}
      end_day={item.end_day}
    />
  ));

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>Количество выполненных дней</Text>
      {itemStat}
      <View style={[styles.itemFlex, {marginTop: 32}]}>
        <Text style={styles.executionResultText}>Выполнено:</Text>
        <Text style={styles.executionResultGreenText}>
          {statistics.done_tasks > statistics.total_tasks
            ? statistics.total_tasks
            : statistics.done_tasks}{' '}
          {declOfNum(statistics.done_tasks, ['день', 'дня', 'дней'])}
        </Text>
      </View>
      <View style={styles.itemFlex}>
        <Text style={styles.executionResultText}>Запланировано:</Text>
        <Text style={styles.executionResultGreenText}>
          {statistics.total_tasks}{' '}
          {declOfNum(statistics.total_tasks, ['день', 'дня', 'дней'])}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 44,
  },
  title: {
    marginTop: 33,
    marginBottom: 23,
    color: 'rgba(5, 185, 240, 1)',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
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

export default StatisticsItem;
