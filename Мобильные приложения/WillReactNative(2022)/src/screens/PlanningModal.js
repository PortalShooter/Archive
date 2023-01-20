import React, {useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import stylesGeneral from '../assets/stylesGeneral';
import {setPlanningModal} from '../redux/auth-reducer';
import {useDispatch} from 'react-redux';

const windowHeight = Math.round(Dimensions.get('window').height - 120);

const PlanningModal = ({setModalIsOpen}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperSlide}>
          <Swiper
            showsButtons={false}
            loop={false}
            paginationStyle={{bottom: -25}}
            onMomentumScrollEnd={(e, state) => {
              if (
                (Platform.OS === 'ios' && state.index === 0) ||
                (Platform.OS !== 'ios' && state.index === 1)
              ) {
                setShow(true);
              } else {
                setShow(false);
              }
            }}
            dot={
              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  width: 11,
                  height: 11,
                  borderRadius: 50,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#05B9F0',
                  width: 11,
                  height: 11,
                  borderRadius: 50,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              />
            }>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Раздел “Планирование”</Text>
              <Text style={styles.text}>
                Здесь ты будешь составлять на предстоящую неделю план выполнения
                своего дела
              </Text>
              <Text style={[styles.text]}>
                Продумай недельный план так, чтобы ты мог выполнить это дело, и
                оно не помешало другим важным делам.
              </Text>
              <Text style={[styles.text]}>
                В этом случае план станет тебе хорошим помощником.
              </Text>
              <Text style={[styles.text]}>
                Если нужно поставить одинаковое время выполнения дела на все дни
                недели, тапни 2 раза по времени, выбранному для понедельника, и
                проведи вправо до субботы. Воскресенье - выходной, и на него не
                надо планировать дело.
              </Text>
              <Image
                style={{marginTop: 39, marginBottom: 49}}
                source={require('../assets/CalendarItem2.png')}
              />
              <Text style={[styles.text]}>
                Если важно задать дням недели разное время выполнения, просто
                тапни два раза в нужный день напротив нужного времени.
              </Text>
              <Image
                style={{marginTop: 10, marginBottom: 39}}
                source={require('../assets/CalendarItem1.png')}
              />
              {/*<Text style={styles.text}>*/}
              {/*  Вносить изменения в план можно только до наступления рабочей*/}
              {/*  недели!*/}
              {/*</Text>*/}
            </ScrollView>

            <View style={{justifyContent: 'space-between'}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text style={styles.title}>Раздел “Планирование”</Text>
                  <Text style={[styles.text, styles.subtext]}>
                    1. Укажи время начала дела точно (час и минуты), если
                    можешь. Если это трудно, укажи час, в котором начнешь.{'\n'}
                    Например, 7:00.
                  </Text>
                  <Text style={[styles.text]}>
                    2. Четко определи объем дела – продолжительность или другой
                    показатель. Например, количество отжиманий.
                  </Text>
                  <Text style={[styles.text, styles.subtext]}>
                    Укажи Цель дела. Для чего оно нужно.
                  </Text>
                  <Text style={[styles.text, styles.subtext]}>
                    3. Напоминаем, что минимальная продолжительность уже задана
                    Правилами. Это – минимум 15 минут физических нагрузок. И не
                    менее 8 минут для подведения итогов дня.
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      styles.subtext,
                      {fontFamily: 'Nunito-Bold'},
                    ]}>
                    4. ВАЖНО! Редактировать план можно только до начала
                    очередной недели.
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      styles.subtext,
                      {fontFamily: 'Nunito-Bold'},
                    ]}>
                    5. ВАЖНО! Отмечать результаты выполнения дела НАДО в тот
                    день, когда оно выполнялось. Если такой отметки не будет,
                    дело отмечается как невыполненное.
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      styles.subtext,
                      {fontFamily: 'Nunito-Bold'},
                    ]}>
                    Это – правило работы курса.{'\n'}
                    Ни заранее, ни «задним числом» внести такую отметку в
                    программу нельзя.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </Swiper>
          <View style={styles.btn}>
            {show && (
              <Text
                style={[stylesGeneral.blueButton]}
                onPress={() => {
                  setModalIsOpen(false);
                  dispatch(setPlanningModal(false));
                }}>
                Закрыть
              </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    width: '100%',
    paddingTop: 90,
  },
  wrapperSlide: {
    paddingTop: 24,
    paddingHorizontal: 29,
    backgroundColor: '#fff',
    height: windowHeight,
    display: 'flex',
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    marginBottom: 33,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    marginBottom: 15,
    fontSize: 16,
  },
  subtext: {
    marginBottom: 28,
  },
  btn: {
    marginBottom: 25,
    marginTop: 40,
  },
});

export default PlanningModal;
