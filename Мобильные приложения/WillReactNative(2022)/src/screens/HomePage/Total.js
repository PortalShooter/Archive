import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import MultiSliderItem from '../FilesArchive/Components/MultiSlider';
import stylesGeneral from '../../assets/stylesGeneral';
import {fetchTasksStatistics} from '../../redux/homePage-reducer';
import Header from '../../components/Header';
import AdditionalInformation from '../../components/AdditionalInformation';
// import {declOfNum} from '../../components/HelperFunctions';
import { addWeeks, closeTaskActual } from "../../redux/auth-reducer";

const Total = props => {
  const dispatch = useDispatch();
  const prop = props.route.params.tasksActual;
  const navigation = props.route.params.navigation;
  const numberTasks = useSelector(state => state.Auth.numberTusks);
  // const allTasks = useSelector(state => state.Auth.allTasks);

  useEffect(() => {
    dispatch(fetchTasksStatistics(prop.id));
  }, [dispatch]);

  const data = useSelector(state => state.HomePage.statistics);

  // const present = props.route.params.present;

  const badSlider = data.total_tasks - data.great - data.good;
  const great = (data.great / data.total_tasks) * 100;
  const bad = (badSlider / data.total_tasks) * 100;

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
    } else if (bad > 50 || (data.done_tasks / data.total_tasks) * 100 < 50) {
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

  return (
    <Header>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.wrap}>
            <Text style={styles.title}>Процент выполнения дела</Text>
            <Text>
              <Text style={styles.semiBold}>Отлично</Text>{' '}
              <Text style={styles.text}>81-100%</Text>
            </Text>
            <MultiSliderItem values={data.great} total={data.total_tasks} />
            <Text>
              <Text style={styles.semiBold}>Хорошо</Text>{' '}
              <Text style={styles.text}>50-80%</Text>
            </Text>
            <MultiSliderItem values={data.good} total={data.total_tasks} />
            <Text>
              <Text style={styles.semiBold}>Слабо</Text>{' '}
              <Text style={styles.text}>0-49%</Text>
            </Text>
            <MultiSliderItem values={badSlider} total={data.total_tasks} />
            <View style={[styles.itemFlex, {marginTop: 32}]}>
              <Text style={styles.executionResultText}>Выполнено:</Text>
              <Text style={styles.executionResultGreenText}>
                {data.done_tasks > data.total_tasks
                  ? data.total_tasks
                  : data.done_tasks}
              </Text>
            </View>
            <View style={styles.itemFlex}>
              <Text style={styles.executionResultText}>Запланировано:</Text>
              <Text style={styles.executionResultGreenText}>
                {data.total_tasks}
              </Text>
            </View>
            <View>
              {result()}
              <Text
                style={[stylesGeneral.blueButton, {marginTop: 20}]}
                onPress={() => navigation.navigate('Статистика')}>
                Перейти в статистику
              </Text>
            </View>
          </View>
            {numberTasks === 1 &&
                <View style={[styles.wrap]}>
                  <Text style={[styles.total, {marginBottom: 25}]}>Продлить Дело на 6 недель для закрепления полезных привычек</Text>
                  {/*<Text style={styles.totalText}>Срок активации {present} {declOfNum(present , ['день', 'дня', 'дней'])}</Text>*/}
                  <Text style={stylesGeneral.blueButton} onPress={() => {
                    dispatch(addWeeks())}
                  }>Продлить</Text>
                </View>
            }

            <View style={[styles.wrap]}>
              {/*<Text style={[styles.total, {color: '#05B9F0', fontSize: 16, marginTop: 10}]}>Начало нового дела</Text>*/}
              {/*<View*/}
              {/*  style={{minWidth: 200, height: 1, backgroundColor: '#F5F5F5', marginTop: 10}}/>*/}
              <Text style={[styles.totalText, {fontFamily: 'Nunito-Bold'}]}>Начать новое дело</Text>
              <Text style={stylesGeneral.blueButton} onPress={() => {
                dispatch(closeTaskActual(prop.id, navigation))
              }}>Начать</Text>
            </View>
          <AdditionalInformation
            text={[
              'Для более глубокого продвижения в тему развития рекомендуем книгу «Тренажер для Я» и другие ресурсы –  смотри Дополнительное.',
            ]}
          />
        </View>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  namePage: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
    marginHorizontal: 26,
  },
  wrapper: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    marginBottom: 20,
  },
  wrap: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 20,
  },
  title: {
    marginTop: 16,
    marginBottom: 23,
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
    fontSize: 12,
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
    marginTop: 15,
  },
  totalText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 26,
  },
});

export default Total;
