import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Header from '../components/Header';
import Swiper from 'react-native-swiper';
import stylesGeneral from '../assets/stylesGeneral';
import Arrow from '../components/Arrow';
import PlanningModal from './PlanningModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  setChangeModal,
  setChangePlanning,
  setPlanningModal,
  setTabBtn,
  updateDayTime,
  updateTaskParams,
} from '../redux/auth-reducer';
import Plan from '../components/PlaningTime/Plan';
import Explanations from '../components/Explanations';
import AdditionalInformation from '../components/AdditionalInformation';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderGray from '../components/LoaderGray';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Planning = ({route, navigation}) => {
  const dispatch = useDispatch();
  const PlanningModalOpen = useSelector(state => state.Auth.planingModal);
  const tasksActual = useSelector(state => state.Auth.tasksActual);
  const [DataDaysTime, setDataDaysTime] = useState([[], []]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [changeDesc, setChangeDesc] = useState(false);
  const [loader, setLoader] = useState(true);
  const [indexWeek, setIndexWeek] = useState(0);
  const contentArr = [];
  const changePlanning = useSelector(state => state.Auth.changePlanning);
  const changeModal = useSelector(state => state.Auth.changeModal);
  const blockPlan = useSelector(state => state.Auth.blockPlan);

  const [activeWeek, setActiveWeek] = useState(0);

  const [internet, setInternet] = useState(true);
  const content = [
    <AdditionalInformation
      text={[
        'Желтый - запланировано \nЗеленый - выполнено вовремя \nСиний - выполнено не вовремя \nСерый - пропущено',
      ]}
    />,
    <AdditionalInformation
      text={[
        'Скорректируй время по дням, если необходимо. \nВносить изменения в план можно только до наступления очередной недели!',
      ]}
    />,
  ];
  const startDate = useSelector(state => state.Auth.startDate);
  const date = new Date();
  Date.prototype.addDays = function (week, bias = 0) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - 7 + 7 * week + bias);
    return date;
  };

  const firstPlanning = route.name === 'FirstPlanning';
  if (firstPlanning && navigation.getState().index === 0) {
    navigation.reset({
      index: 2,
      routes: [{name: 'DateStart'}, {name: 'FirstPlanning'}],
    });
  }
  useEffect(() => {
    if (blockPlan) {
      dispatch(setTabBtn(true));
    }
  }, [blockPlan]);

  useEffect(() => {
    console.log('tasksActual',tasksActual)
  }, [tasksActual]);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternet(state.isConnected);
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (
      tasksActual &&
      tasksActual.task_days &&
      Object.keys(tasksActual).length !== 0
    ) {
      setLoader(false);
      if (tasksActual.description) {
        setNewDesc(tasksActual.description);
      }
    }
    if (PlanningModalOpen) {
      setModalIsOpen(true);
    }
    if (!tasksActual.description) {
      dispatch(setTabBtn(true));
    }
  }, [tasksActual, dispatch]);

  useEffect(() => {
    if (modalIsOpen && PlanningModalOpen) {
      dispatch(setPlanningModal(false));
    }
  }, [modalIsOpen]);
  useEffect(() => {
    if (
      (changeDesc && !firstPlanning) ||
      (DataDaysTime[0].length !== 0 && !changePlanning && !firstPlanning)
    ) {
      dispatch(setChangePlanning(true));
    }
  }, [changeDesc, DataDaysTime]);
  const AlertSuccess = () =>
    Alert.alert('', 'Данные успешно сохранены', [
      {
        text: 'OK',
        onPress: () => {
          if (firstPlanning) {
            // RNRestart.Restart();
            navigation.navigate('Navigation');
          }
        },
      },
    ]);
  const AlertTextError = () =>
    Alert.alert('', 'Не все поля заполнены', [{text: 'OK'}]);
  const AlertText = () =>
    Alert.alert('', 'Описание успешно изменено', [
      {
        text: 'OK',
        onPress: () => {
          if (firstPlanning) {
            // RNRestart.Restart();
            navigation.navigate('Navigation');
          }
        },
      },
    ]);

  if (loader) {
    return <LoaderGray />;
  } else {
    const weekNumber = tasksActual.task_days.length / 7;
    let slideWeek = [];
    for (let i = 1; i <= weekNumber; i++) {
      slideWeek.push(i);
    }

    const arrFirstDay = [];
    for (let i = 0; i < slideWeek.length; ++i) {
      arrFirstDay.push(tasksActual.task_days[i * 7].day);
    }

    if (tasksActual) {
      slideWeek = slideWeek.map(item => {
        const daysOfWeek = [];
        let day = item * 7 - 7;
        for (let i = day; i < day + 7; i++) {
          daysOfWeek.push(tasksActual.task_days[i]);
        }
        const firstDay = date.addDays(item);
        const lastDay = date.addDays(item + 1, -1);

        if (date > firstDay) {
          contentArr.push(0);
        } else {
          contentArr.push(1);
        }
        return (
          <View>
            <Plan
              arrFirstDay={arrFirstDay}
              daysOfWeek={daysOfWeek}
              firstDay={firstDay}
              lastDay={lastDay}
              week={item}
              DataDaysTime={DataDaysTime}
              setDataDaysTime={setDataDaysTime}
              internet={internet}
              setActiveWeek={setActiveWeek}
            />
          </View>
        );
      });
    }

    async function saveChange(fakeSave = false) {
      if (fakeSave) {
        dispatch(setChangePlanning(false));
        dispatch(setTabBtn(false));
      }
      await AsyncStorage.setItem('@todayReminder', '3');
      await AsyncStorage.setItem(
        '@nextTime',
        JSON.stringify(date.setDate(date.getDate() + 4)),
      );
      if (
        (DataDaysTime[0].length !== 0 && newDesc.length !== 0) ||
        (!!route.params && !!route.params.sunday)
      ) {
        dispatch(setChangePlanning(false));
        setChangeDesc(false);
        dispatch(
          updateDayTime(tasksActual.id, DataDaysTime[0], DataDaysTime[1]),
        );
        dispatch(updateTaskParams(tasksActual.id, newDesc)).then(() => {
          AlertSuccess();
        });
        setDataDaysTime([[], []]);
      } else if (newDesc.length === 0) {
        AlertTextError();
      } else if (changeDesc && newDesc.length !== 0) {
        setChangeDesc(false);
        dispatch(setChangePlanning(false));
        dispatch(updateTaskParams(tasksActual.id, newDesc)).then(() => {
          AlertText();
        });
      }
    }

    return (
      <Header>
        <ScrollView style={{backgroundColor: '#F8F8F8'}}>
          <KeyboardAwareScrollView style={{height: '100%'}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{alignItems: 'center', paddingHorizontal: 20}}>
              <Text style={styles.title}>
                Дело:
                <Text style={{color: 'rgba(5, 185, 240, 1)'}}>
                  {' '}
                  {tasksActual.title}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-Regular',
                  marginTop: 6,
                  marginBottom: 20,
                }}>
                Выполнение дела минимум: {tasksActual.min_time_in_minutes} минут
              </Text>
              <Text
                style={{
                  color: 'rgba(5, 185, 240, 1)',
                  fontSize: 16,
                  fontFamily: 'Nunito-Bold',
                  marginBottom: 8,
                }}>
                Моя задача
              </Text>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  width: '100%',
                  paddingHorizontal: 19,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <TextInput
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Nunito-SemiBold',
                    textAlign: 'center',
                  }}
                  multiline={true}
                  autoCorrect={false}
                  maxLength={500}
                  onChangeText={el => {
                    setNewDesc(el);
                    dispatch(setChangePlanning(true));
                    setChangeDesc(true);
                  }}
                  defaultValue={newDesc}
                  placeholder={'Укажи объем выполнения и цель дела'}
                  placeholderTextColor="#989898"
                />
              </View>
              {content[contentArr[indexWeek]]}
              <Explanations
                color={'#58D181'}
                modalOpen={setModalIsOpen}
                colorBgC={'#fff'}
              />
              {modalIsOpen ? (
                <PlanningModal setModalIsOpen={setModalIsOpen} />
              ) : null}
            </View>
            <Swiper
              style={{height: 1088}}
              showsButtons={true}
              showsPagination={false}
              scrollEnabled={false}
              loop={false}
              index={activeWeek}
              onIndexChanged={e => {
                setIndexWeek(e);
              }}
              buttonWrapperStyle={{
                top: -1,
                height: 25,
                width: '100%',
              }}
              nextButton={
                <Arrow rotate={-90} color={'#B7B7B7'} style={{width: 35}} />
              }
              prevButton={
                <Arrow rotate={90} color={'#B7B7B7'} style={{width: 35}} />
              }>
              {slideWeek}
            </Swiper>
            <View
              style={{
                paddingHorizontal: '5%',
                borderTopColor: '#F5F5F5',
                borderTopWidth: 1,
                paddingTop: 25,
                backgroundColor: '#fff',
              }}>
              <Text
                style={[
                  stylesGeneral.blueButton,
                  !(
                    (newDesc.length !== 0 && changeDesc) ||
                    DataDaysTime[0].length !== 0 ||
                    (!!route.params && !!route.params.sunday)
                  ) && {backgroundColor: '#F3F3F3'},
                ]}
                onPress={() => {
                  saveChange();
                }}>
                План мне подходит
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
        {newDesc.length === 0
          ? changeModal && <ModalError />
          : changeModal && (
              <Modal
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                transparent={true}
                animationType={'fade'}
                statusBarTranslucent={true}>
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.34)',
                    height: '100%',
                    width: '100%',
                    paddingTop: '66%',
                  }}>
                  <View
                    style={{
                      paddingTop: 33,
                      paddingHorizontal: 22,
                      paddingBottom: 29,
                      backgroundColor: '#fff',
                      display: 'flex',
                      borderRadius: 5,
                      marginHorizontal: 20,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-SemiBold',
                        textAlign: 'center',
                        marginBottom: 29,
                      }}>
                      План тебе подходит?
                    </Text>
                    <TouchableNativeFeedback
                      onPress={() => {
                        saveChange(true);
                        dispatch(setChangeModal(false));
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: 42,
                          paddingTop: 10,
                          borderRadius: 5,
                          marginBottom: 25,
                          backgroundColor: '#58D181',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontFamily: 'Nunito-SemiBold',
                          }}>
                          Да
                        </Text>
                      </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                      onPress={() => {
                        dispatch(setChangeModal(false));
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: 42,
                          paddingTop: 10,
                          borderRadius: 5,
                          backgroundColor: '#FF4242',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontFamily: 'Nunito-SemiBold',
                          }}>
                          Нет
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </Modal>
            )}
      </Header>
    );
  }
};

const ModalError = () => {
  const dispatch = useDispatch();
  return (
    <Modal
      style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.34)',
          height: '100%',
          width: '100%',
          paddingTop: '70%',
        }}>
        <View
          style={{
            paddingTop: 33,
            paddingHorizontal: 22,
            paddingBottom: 29,
            backgroundColor: '#fff',
            display: 'flex',
            borderRadius: 5,
            marginHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBold',
              textAlign: 'center',
              marginBottom: 25,
            }}>
            Не все поля заполнены
          </Text>
          <Text
            onPress={() => {
              dispatch(setChangeModal(false));
            }}
            style={{
              textAlign: 'center',
              color: '#C4C4C4',
              fontFamily: 'Nunito-SemiBold',
            }}>
            Ок
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginTop: 18,
    textAlign: 'center',
  },
});

export default Planning;
