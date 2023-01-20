import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import MultiSliderItem from './MultiSlider';
import Header from '../../../components/Header';
import {API} from '../../../api/api';
import {declOfNum} from '../../../components/HelperFunctions';
import ItemsStat from '../../Statistics/ItemsStat';
import AdditionalNavigation from '../../Additional/AdditionalNavigation';

const Run = props => {
  const [stat, setStat] = useState({
    bad: 0,
    good: 0,
    great: 0,
  });
  useEffect(() => {
    API.getTasksStatistics(props.route.params.m.id)
      .then(res => {
        setStat(res.data.data);
      })
      .catch(e => {
        console.log(e.response);
      });
  });

  const badSlider = stat.total_tasks - stat.great - stat.good;
  const great = (stat.great / stat.total_tasks) * 100;
  const bad = (badSlider / stat.total_tasks) * 100;

  const result = () => {
    if (great > 80) {
      return (
        <View>
          <Text style={styles.total}>Отлично. Поздравляем! </Text>
          <Text style={styles.totalText}>
            Рекомендуем продолжать саморазвитие. Реальный шанс сильно
            продвинуться.
          </Text>
        </View>
      );
    } else if (bad > 50 || (stat.done_tasks / stat.total_tasks) * 100 < 50) {
      return (
        <View>
          <Text style={styles.total}>Слабо.</Text>
          <Text style={styles.totalText}>
            Старайся делать дело «во что бы то ни стало». Если возникнут
            трудности – присоединяйся в чат
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.total}>Хорошо.</Text>
          <Text style={styles.totalText}>
            Рекомендуем продолжать саморазвитие. У тебя хорошие способности.
          </Text>
        </View>
      );
    }
  };
  const initialArr = stat.weeks ? stat.weeks.filter(f => f) : [];

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
    <Header>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.wrapper}>
            <View
              style={{
                padding: 20,
                backgroundColor: '#fff',
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text style={styles.title}>Процент выполнения дела</Text>
              <View
                style={{
                  minWidth: 200,
                  height: 1,
                  backgroundColor: '#F5F5F5',
                  marginBottom: 15,
                }}
              />
              <Text>
                <Text style={styles.semiBold}>Отлично</Text>{' '}
                <Text style={styles.text}>81-100%</Text>
              </Text>
              <MultiSliderItem values={stat.great} total={stat.total_tasks} />
              <Text>
                <Text style={styles.semiBold}>Хорошо</Text>{' '}
                <Text style={styles.text}>50-80%</Text>
              </Text>
              <MultiSliderItem values={stat.good} total={stat.total_tasks} />
              <Text>
                <Text style={styles.semiBold}>Слабо</Text>{' '}
                <Text style={styles.text}>0-49%</Text>
              </Text>
              <MultiSliderItem values={badSlider} total={stat.total_tasks} />
              <View style={[styles.itemFlex, {marginTop: 32}]}>
                <Text style={styles.executionResultText}>Выполнено:</Text>
                <Text style={styles.executionResultGreenText}>
                  {stat.done_tasks > stat.total_tasks
                    ? stat.total_tasks
                    : stat.done_tasks}
                </Text>
              </View>
              <View style={styles.itemFlex}>
                <Text style={styles.executionResultText}>Запланировано:</Text>
                <Text style={styles.executionResultGreenText}>
                  {stat.total_tasks}
                </Text>
              </View>
              <View>{result()}</View>
            </View>
            <View style={styles.statWrapper}>
              <Text style={styles.title}>Количество выполненных дней</Text>
              <View
                style={{
                  minWidth: 200,
                  height: 1,
                  backgroundColor: '#F5F5F5',
                  marginBottom: 15,
                }}
              />
              {itemStat}
              <View style={[styles.itemFlex, {marginTop: 32}]}>
                <Text style={styles.executionResultText}>Выполнено:</Text>
                <Text style={styles.executionResultGreenText}>
                  {stat.done_tasks}{' '}
                  {declOfNum(stat.done_tasks, ['день', 'дня', 'дней'])}
                </Text>
              </View>
              <View style={styles.itemFlex}>
                <Text style={styles.executionResultText}>Запланировано:</Text>
                <Text
                  style={[styles.executionResultGreenText, {marginBottom: 50}]}>
                  {stat.total_tasks}{' '}
                  {declOfNum(stat.total_tasks, ['день', 'дня', 'дней'])}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <AdditionalNavigation navigation={props.navigation} />
      </SafeAreaView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  statWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: 'rgba(5, 185, 240, 1)',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  semiBold: {
    fontFamily: 'Nunito-SemiBold',
  },
  text: {
    fontFamily: 'Nunito-Regular',
  },
  executionResultText: {
    fontFamily: 'Nunito-Regular',
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
  total: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginTop: 29,
  },
  totalText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    marginTop: 20,
  },
});

export default Run;
