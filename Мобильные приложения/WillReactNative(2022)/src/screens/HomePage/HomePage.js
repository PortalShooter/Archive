import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import stylesGeneral from '../../assets/stylesGeneral';
import Header from '../../components/Header';
import Disconnect from '../../assets/img/Disconnect';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  fetchTasksStatistics,
  putTaskDays,
  setVisibleReminderAC,
} from '../../redux/homePage-reducer';
import {days, month} from '../../assets/data/date';
import ModalPlanningReminder from '../../components/ModalWindows/ModalPlanningReminder';
import HomePageVideo from '../../assets/homePageVideo/homePageVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageResultWindow from './HomePageResultWindow';
import HomePageResultModal from './HomePageResultModal';
import PushNotification from 'react-native-push-notification';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getNumberTasks} from "../../redux/auth-reducer";

const HomePage = ({navigation}) => {
  const tasksActual = useSelector(state => state.Auth.tasksActual)
    ? useSelector(state => state.Auth.tasksActual)
    : {
        default_case_id: null,
        description: '',
        first_day_time: null,
        id: null,
        min_time_in_minutes: 45,
        start_date: '',
        task_days: [],
        title: '',
        user_id: null,
        weeks_number: null,
      };

  const visibleReminderState = useSelector(
    state => state.HomePage.visibleReminder,
  );
  // const stat = useSelector(state => state.HomePage.statistics);
  // const allTasks = useSelector(state => state.Auth.allTasks);
  const numberTasks = useSelector(state => state.Auth.numberTusks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksStatistics(tasksActual.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getNumberTasks());
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      const DeliveredNotifications = await AsyncStorage.multiGet([
        '@DeliveredNotifications1',
        '@DeliveredNotifications2',
        '@DeliveredNotifications3',
      ]);
      const numberTasks = await AsyncStorage.getItem('@numberTasks');
      if (tasksActual && numberTasks && numberTasks === '1') {
        const start_date = new Date(tasksActual.start_date);
        const firstSaturday = new Date(start_date);
        firstSaturday.setDate(new Date(start_date).getDate() + 5);

        const secondSaturday = new Date(start_date);
        secondSaturday.setDate(new Date(start_date).getDate() + 12);

        const thirdNotification = new Date(start_date);
        thirdNotification.setDate(new Date(start_date).getDate() + 1);

        for (const el of DeliveredNotifications) {
          const index = DeliveredNotifications.indexOf(el);
          if (index === 0 && el[1] === null) {
            PushNotification.localNotificationSchedule({
              id: 1,
              channelId: 'firstSaturday',
              date: new Date(
                firstSaturday.getFullYear(),
                firstSaturday.getMonth(),
                firstSaturday.getDate(),
                9,
              ),
              message:
                'Появилось новое видео "Что делать, когда не хочу делать дело" и "Почему откладываются дела"', // (required)
              allowWhileIdle: false,
              smallIcon: 'notification_icon',
            });
            await AsyncStorage.setItem('@DeliveredNotifications1', '1');
          }
          if (index === 1 && el[1] === null) {
            PushNotification.localNotificationSchedule({
              id: 2,
              channelId: 'secondSaturday',
              date: new Date(
                secondSaturday.getFullYear(),
                secondSaturday.getMonth(),
                secondSaturday.getDate(),
                9,
              ),
              message: 'Появилось новое видео "Верное завершение дел"', // (required)
              allowWhileIdle: false,
              smallIcon: 'notification_icon',
            });
            await AsyncStorage.setItem('@DeliveredNotifications2', '2');
          }
          if (index === 2 && el[1] === null) {
            PushNotification.localNotificationSchedule({
              id: 3,
              channelId: 'thirdNotification',
              date: new Date(
                thirdNotification.getFullYear(),
                thirdNotification.getMonth(),
                thirdNotification.getDate(),
                5,
              ),
              message:
                'Рекомендуем как можно точнее отмечать результаты выполнения дела', // (required)
              allowWhileIdle: false,
              smallIcon: 'notification_icon',
            });
            await AsyncStorage.setItem('@DeliveredNotifications3', '3');
          }
        }
      }
    })();
  }, []);

  const [playing, setPlaying] = useState(false);
  const [moodValue, setMoodValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [visibleReminder, setVisibleReminder] = useState(false);
  const [connected, setConnected] = useState(true);
  const [connectedModal, setConnectedModal] = useState(false);
  const [openSetResult, setOpenSetResult] = useState(false);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [completionRate, setCompletionRate] = useState(0);
  const [willingnessRate, setWillingnessRate] = useState(0);
  const [unwillingnessRate, setUnwillingnessRate] = useState(0);
  const [totalDays, setTotalDays] = useState(false);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState('');
  const [today, setToday] = useState(new Date());
  const [scrollToY, setScrollToY] = useState(0);
  const [sunDay, setSunDay] = useState(new Date().getDay());

  useEffect(() => {
    const id = setInterval(() => {
      setToday(new Date());
      setSunDay(new Date().getDay());
    }, 5 * 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  //отслеживание интернет соеденения
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnected(true);
        setConnectedModal(false);
      } else {
        setTimeout(() => {
          if (state.isConnected) {
          } else {
            setConnected(false);
          }
        }, 8 * 1000);
      }
    });
    return () => {
      unsubscribe();
    };
  });
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  // кольво дней, до страта -n, после старта +n
  const startDate = Math.ceil(
    (new Date() - new Date(tasksActual.start_date)) / (1000 * 3600 * 24),
  );

  let date = new Date(tasksActual.start_date);

  // коль-во выполненного в последней недели
  const total = tasksActual.task_days
    ? tasksActual.task_days
        .slice(
          tasksActual.task_days.length - 7,
          tasksActual.task_days.length - 1,
        )
        .filter(x => x.start_time !== null).length
    : null;
  // актуальная на сегодня таска {}
  const dayNowId =
    tasksActual.task_days !== undefined
      ? tasksActual.task_days.find(f =>
          new Date(f.day) - new Date(yyyy + '-' + mm + '-' + dd) === 0
            ? f
            : null,
        )
      : {start_time: null};

  // индекс текущего дня
  const indexAtTheMoment = tasksActual.task_days
    ? tasksActual.task_days.indexOf(dayNowId)
    : '';
  //поиск следующей недели для напоминалки
  const numberOfWeek = dayNowId
    ? new Date(dayNowId.day).getDay() === 0
      ? 1
      : 8 - new Date(dayNowId.day).getDay()
    : '';
  const nextMonDay = tasksActual.task_days
    .slice(indexAtTheMoment + numberOfWeek, indexAtTheMoment + numberOfWeek + 7)
    .filter(f => (f.planned_start_time ? f : null));
  //проверка предыдущей недели, на заполнение всех дней
  const checkingTheCompletedInTheWeek = tasksActual.task_days
    ? today.getDay() === 0
      ? tasksActual.task_days
          .slice(indexAtTheMoment - 6, indexAtTheMoment)
          .filter(f =>
            f.start_time === null || f.completion_rate === 0 ? f : null,
          )
      : ''
    : '';

  //счетчик подарка
  // const [present, setPresent] = useState(0);

  // useEffect(() => {
  //   if (allTasks.length <= 1) {
  //     if (stat.weeks) {
  //       if (stat.weeks.length > 3) {
  //         setPresent(-1);
  //       } else {
  //         setPresent(
  //           3 +
  //             Math.ceil(
  //               (new Date(
  //                 tasksActual.task_days[tasksActual.task_days.length - 1].day,
  //               ) -
  //                 today) /
  //                 (1000 * 3600 * 24),
  //             ),
  //         );
  //       }
  //     } else {
  //       setPresent(-1);
  //     }
  //   } else {
  //     setPresent(-1);
  //   }
  // });

  // const sunDay = dayNowId ? new Date(dayNowId.day).getDay() : null;

  useEffect(() => {
    let sum = tasksActual.task_days.length;

    if ((numberTasks === 1 || numberTasks === null) && sum > 30) {
      function dni() {
        let D = new Date(tasksActual.start_date);
        D.setDate(D.getDate() + 63);
        if (new Date() >= D) {
          setTotalDays(true);
        } else if (startDate <= sum && total === 6) {
          setTotalDays(true);
        } else if (
            (startDate === sum && dayNowId.start_time !== null) ||
            undefined
        ) {
          setTotalDays(true);
        } else if (startDate < sum) {
          setTotalDays(false);
        }
      }
      dni()
    } else {
      if (startDate > sum) {
        setTotalDays(true);
      } else if (startDate <= sum && total === 6) {
        setTotalDays(true);
      } else if (
          (startDate === sum && dayNowId.start_time !== null) ||
          undefined
      ) {
        setTotalDays(true);
      } else if (startDate < sum) {
        setTotalDays(false);
      }
    }
  }, [numberTasks, totalDays]);

  const saveHandler = () => {
    if (
      connected &&
      hours &&
      minutes &&
      (sunDay === 0 ? true : dayNowId.planned_start_time)
    ) {
      const resultTaskDays = {
        planned_start_time:
          sunDay === 0
            ? hours + ':' + minutes
            : dayNowId.planned_start_time.substr(0, 5),
        start_time: hours + ':' + minutes,
        completion_rate: completionRate,
        willingness_rate: willingnessRate,
        unwillingness_rate: unwillingnessRate,
        interference: inputValue,
        is_get_joy: moodValue,
      };
      if ((startDate === 13 && today.getHours() >= 9) || startDate >= 14) {
        if (moodValue === 1 || moodValue === 0) {
          dispatch(putTaskDays(resultTaskDays, dayNowId.id, tasksActual.id));
          setOpenSetResult(false);
        } else if (moodValue !== 0 || 1) {
          setErrorValue('Удалось порадоваться?');
          setError(true);
        }
      } else if ((startDate <= 13 && today.getHours() <= 9) || startDate < 13) {
        dispatch(putTaskDays(resultTaskDays, dayNowId.id, tasksActual.id));
        setOpenSetResult(false);
      }
    } else if (!hours) {
      setErrorValue('Не выбрано время');
      setError(true);
    } else if (!dayNowId.planned_start_time) {
      setErrorValue('Запланированное время старта не выбрано в планирование');
      setError(true);
    }
    // else {
    //   await AsyncStorage.setItem('@homePageResult', resultTaskDays)
    // }
  };

  // 1 - не появл. в сб,
  // 2 - не появл. в вс,
  // 3 - заполнил в сб и в вс, не показывать и в вс
  useEffect(() => {
    dispatch(setVisibleReminderAC(true));
  }, [dispatch]);
  useEffect(async () => {
    const reminderDate = await AsyncStorage.getItem('@todayReminder');
    const reminderTime = JSON.parse(
      await AsyncStorage.getItem('@timeReminder'),
    );
    const nextTime = JSON.parse(await AsyncStorage.getItem('@nextTime'));
    const D = new Date(reminderTime);
    if (nextTime < today && reminderDate === '3') {
      await AsyncStorage.removeItem('@timeReminder');
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    }
    if (sunDay === 0 && visibleReminderState && reminderDate === '2') {
      await AsyncStorage.removeItem('@timeReminder');
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    } else if (
      sunDay === 6 &&
      nextMonDay.length !== 0 &&
      reminderDate !== '1' &&
      reminderDate !== '3'
    ) {
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    } else if (
      sunDay === 6 &&
      reminderDate === '1' &&
      today >= D &&
      visibleReminderState
    ) {
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    } else if (
      sunDay === 0 &&
      nextMonDay.length !== 0 &&
      reminderDate !== '2' &&
      reminderDate !== '3'
    ) {
      await AsyncStorage.removeItem('@timeReminder');
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    } else if (sunDay === 0 && reminderDate === '2' && visibleReminderState) {
      await AsyncStorage.setItem(
        '@todayReminder',
        new Date().toISOString().slice(0, 10),
      );
    } else if (
      sunDay === 1 ||
      sunDay === 2 ||
      sunDay === 3 ||
      sunDay === 4 ||
      sunDay === 5
    ) {
      await AsyncStorage.removeItem('@todayReminder');
      await AsyncStorage.removeItem('@timeReminder');
    }
    await reminderHandler();
  }, [today]);

  const reminderHandler = async () => {
    const reminderDate = await AsyncStorage.getItem('@todayReminder');
    if (startDate > 1 && startDate < tasksActual.task_days.length) {
      if (new Date(yyyy + '-' + mm + '-' + dd) - new Date(reminderDate) === 0) {
        setVisibleReminder(true);
      } else if (
        new Date(yyyy + '-' + mm + '-' + dd) - new Date(reminderDate) ===
        0
      ) {
        setVisibleReminder(true);
      } else if (reminderDate === null || '1' || '2') {
        setVisibleReminder(false);
      }
    }
  };

  const scrollToNewVideo = useRef();
  useEffect(async () => {
    const scrollVideoIndex = await AsyncStorage.getItem('@scrollVideo');
    if (scrollVideoIndex === '1') {
      scrollToNewVideo.current.scrollTo(scrollToY);
      await AsyncStorage.setItem('@scrollVideo', '12');
    } else if (scrollVideoIndex === '2') {
      scrollToNewVideo.current.scrollTo(scrollToY);
      await AsyncStorage.setItem('@scrollVideo', String(tasksActual.id));
    }
  });

  return (
    <Header>
      <ScrollView
        style={{height: '100%', backgroundColor: '#F8F8F8'}}
        ref={scrollToNewVideo}>
        <KeyboardAwareScrollView style={{height: '100%'}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          {visibleReminder ? (
            <ModalPlanningReminder
              navigation={navigation}
              setVisibleReminder={setVisibleReminder}
              sunday={sunDay}
              today={today}
            />
          ) : null}
          <View style={styles.wrapper}>
            {connected ? null : (
              <View style={styles.disconnectWrapper}>
                <Disconnect />
                <Text style={styles.disconnectText}>
                  Для сохранения результатов выполнения дел нужен интернет
                </Text>
              </View>
            )}

            <View style={styles.beforeTheBeginning}>
              <Text style={styles.title}>Учет результатов выполнения</Text>
              <View
                style={{
                  minWidth: 200,
                  height: 1,
                  backgroundColor: '#F5F5F5',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}
              />
              {startDate <= 0 ? null : (
                <Text style={[styles.text, {fontSize: 16, marginVertical: 20}]}>
                  {new Date().getDate()} {month[new Date().getMonth()]},{' '}
                  {days[new Date().getDay()]}
                </Text>
              )}
              {openSetResult ? (
                <HomePageResultModal
                  error={error}
                  visibleTimePicker={visibleTimePicker}
                  setVisibleTimePicker={setVisibleTimePicker}
                  startDate={startDate}
                  today={today}
                  completionRate={completionRate}
                  setCompletionRate={setCompletionRate}
                  errorValue={errorValue}
                  hours={hours}
                  inputValue={inputValue}
                  setHours={setHours}
                  setInputValue={setInputValue}
                  minutes={minutes}
                  moodValue={moodValue}
                  setMinutes={setMinutes}
                  saveHandler={saveHandler}
                  setMoodValue={setMoodValue}
                  setUnwillingnessRate={setUnwillingnessRate}
                  unwillingnessRate={unwillingnessRate}
                  setWillingnessRate={setWillingnessRate}
                  willingnessRate={willingnessRate}
                />
              ) : (
                <HomePageResultWindow
                  navigation={navigation}
                  checkingTheCompletedInTheWeek={checkingTheCompletedInTheWeek}
                  openSetResult={openSetResult}
                  startDate={startDate}
                  date={date}
                  indexAtTheMoment={indexAtTheMoment}
                  tasksActual={tasksActual}
                  connected={connected}
                  dayNowId={dayNowId}
                  // present={present}
                  setOpenSetResult={setOpenSetResult}
                  setVisibleTimePicker={setVisibleTimePicker}
                  visibleTimePicker={visibleTimePicker}
                  sunDay={sunDay}
                  totalDays={totalDays}
                />
              )}
            </View>

            <Modal
              visible={connectedModal}
              transparent={true}
              statusBarTranslucent={true}>
              <View style={styles.modalBgBot}>
                <View style={styles.modalDisconnectWrapper}>
                  <Disconnect />
                  <Text style={styles.modalDisconnectTitle}>
                    Не удалось сохранить результаты из-за нестабильного
                    соединения с интернетом. Пожалуйста, попробуйте позже, когда
                    соединение станет устойчивым.
                  </Text>
                </View>
              </View>
            </Modal>
            {modalVisible ? (
              <View style={{marginTop: 30}}>
                <Text
                  style={stylesGeneral.greenButton}
                  onPress={() => navigation.navigate('Дневник')}>
                  Дневник
                </Text>
                <Text
                  style={stylesGeneral.greenButton}
                  onPress={() => navigation.navigate('Правила', {tasksActual})}>
                  Правила
                </Text>

                <Text
                    style={stylesGeneral.greenButton}
                    onPress={() => navigation.navigate('ToDoList')}>
                  Перечень важных дел
                </Text>
              </View>
            ) : null}
            {connected ? (
              <HomePageVideo
                today={today}
                onStateChange={onStateChange}
                setPlaying={setPlaying}
                playing={playing}
                startDate={startDate}
                setScrollToY={setScrollToY}
                id={tasksActual.id}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: '#fff',
                  paddingHorizontal: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text
                  style={{textAlign: 'center', fontFamily: 'Nunito-Regular'}}>
                  Здесь должны быть видео, но похоже у тебя нет интернета
                </Text>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Header>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  beforeTheBeginning: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textMin: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
  },
  disconnectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 46,
    marginVertical: 19,
    marginHorizontal: 20,
  },
  disconnectText: {
    color: 'rgba(255, 68, 64, 1)',
    marginLeft: 32,
    fontFamily: 'Nunito-Bold',
  },
  title: {
    fontSize: 16,
    color: '#05B9F0',
    lineHeight: 19.5,
    height: 22,
    marginTop: 37,
    marginLeft: 24,
    fontFamily: 'Nunito-Bold',
  },
  text: {
    height: 19,
    marginLeft: 23,
    fontFamily: 'Nunito-Bold',
    marginTop: 28,
    fontSize: 14,
  },
  img: {
    marginTop: 19,
    width: 212,
    height: 114,
    marginLeft: 19,
  },
  grayText: {
    color: '#B0B0B0',
    fontSize: 14,
    marginTop: 17,
    height: 47,
    width: 278,
    marginLeft: 20,
    marginBottom: 37,
    fontFamily: 'Nunito-SemiBold',
  },
  actualStartTime: {
    backgroundColor: '#58D181',
    height: 42,
    borderRadius: 37,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actualStartTimeText: {
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingLeft: 30,
    backgroundColor: '#58D181',
    borderRadius: 50,
    height: 34,
  },
  sliderTitle: {
    fontFamily: 'Nunito-Light',
    fontSize: 12,
    marginLeft: 21,
    marginBottom: 10,
  },
  sliderDescr: {
    fontFamily: 'Nunito_Light',
    fontSize: 10,
    color: '#499563',
    marginLeft: 22,
    marginTop: 5,
    marginBottom: 23,
  },
  valueSlider: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    right: 35,
  },
  moodWrapper: {
    marginTop: 25,
  },
  moodFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 35,
  },
  moodItem: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
  },
  moodItemActive: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#58D181',
    color: '#fff',
  },
  modalBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 11,
  },
  modalWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    height: 210,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalTitle: {
    width: 253,
    textAlign: 'center',
    display: 'flex',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 33,
    marginBottom: 22,
    fontFamily: 'Nunito-Regular',
  },
  remindLater: {
    color: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    height: 171,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalBgBot: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 11,
  },
  modalDisconnectWrapper: {
    width: '100%',
    padding: 20,
    height: 111,
    marginBottom: 99,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  modalDisconnectTitle: {
    width: 253,
    color: 'rgba(255, 66, 66, 1)',
    display: 'flex',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 19,
    fontFamily: 'Nunito-Regular',
  },
  textInputWrapper: {
    marginTop: 26,
  },
  textInput: {
    paddingHorizontal: 21,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 23,
    textAlignVertical: 'top',
    fontFamily: 'Nunito-Light',
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
  },

  greenText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#58D181',
    marginBottom: 19,
    marginLeft: 4,
  },
  blueText: {
    color: '#05B9F0',
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
  textWrapper: {
    marginBottom: 30,
  },
  video: {
    width: 260,
    height: 150,
    backgroundColor: '#C4C4C4',
    // marginRight: 20,
    left: 0,
  },
});
export default HomePage;
