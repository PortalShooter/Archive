import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import AdditionalInformation from '../../components/AdditionalInformation';
import ExplainModal from '../../components/ModalWindows/ExplainModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTrainsTimer,
  fetchTraining,
  postTrainingTimer,
} from '../../redux/training-reducer';
import {month} from '../../assets/data/date';
import TrainTimerItem from './components/TrainTimerItem';
import ModalTrainTimerReminder from '../../components/ModalWindows/ModalTrainTimerReminder';
import Explanations from '../../components/Explanations';
import BlackPoint from '../../assets/img/BlackPoint';
import TrainingStar from '../../assets/img/TrainingStar';

const PointOfAttention = props => {
  const dispatch = useDispatch();
  const trains = useSelector(state => state.Training.trainingDays);
  const trainingId = props.route.params.id;

  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(30);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [starOrPoint, setStarOrPoint] = useState('point');

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [totalTime, setTotalTime] = useState('');
  const [disp, setDisp] = useState(false);
  const [choice, setChoice] = useState(false);
  const [deleteItem, setDeleteTime] = useState([]);
  const [visibleDeleteReminder, setVisibleDeleteReminder] = useState(false);

  useEffect(() => {
    dispatch(fetchTraining(trainingId));
  }, [dispatch]);

  useEffect(() => {
    props.navigation.addListener('blur', () => {
      setStart(false)
    });
  }, [])

  useEffect(() => {
    if (start) {
      const startTime = Date.now();
      let intervalId = setInterval(() => {
        const now = Date.now();
        const diff = (now - startTime) / 1000;
        if (diff >= speed) {
          clearInterval(intervalId);
          setStart(false);
          setStarOrPoint('star');
        }
      }, 250);
      return () => clearInterval(intervalId);
    }
  });

  //счетчик секундомера, запуск пост запроса
  useEffect(async () => {
    let timeDifference = dateEnd - dateStart;
    let totalTime = new Date(timeDifference).toLocaleTimeString().substr(3, 5);
    await setTotalTime(totalTime);
    await setDisp(true);
  }, [dateEnd]);

  let day = new Date();
  let dayNow = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!start) {
      setDateEnd(new Date());
    }
  }, [start])

  //пост запрос после того, как поставили на стоп и все записалось в useState
  if (disp) {
    if (totalTime !== '00:00') {
      dispatch(postTrainingTimer(trainingId, dayNow, totalTime));
      setTotalTime('');
      setDisp(false);
    }
  }

  const fun = key => {
    const dateKey = new Date(key);
    const dateApi = new Date(dayNow) - new Date(key);
    if (dateApi === 0) {
      return 'Сегодня, ' + day.getDate() + ' ' + month[day.getMonth()];
    } else {
      return dateKey.getDate() + ' ' + month[dateKey.getMonth()];
    }
  };

  let tr = [];
  for (const [key, value] of Object.entries(trains)) {
    tr.push(
      <View style={styles.timeWrapper}>
        <Text stele={styles.timeTitle}>{fun(key)}</Text>
        <View style={styles.timeItemWrapper}>
          {value.map((item, index) => (
            <TrainTimerItem
              item={item}
              index={index}
              visibleCheckbox={choice}
              deleteItem={deleteItem}
              setDeleteTime={setDeleteTime}
            />
          ))}
        </View>
      </View>,
    );
  }

  const deleteHandler = () => {
    if (deleteItem.length) {
      dispatch(deleteTrainsTimer(deleteItem, trainingId));
      setDeleteTime([]);
      setChoice(false);
    } else {
      setDeleteTime([]);
      setChoice(false);
    }
  };

  return (
    <Header>
      {visibleDeleteReminder ? (
        <ModalTrainTimerReminder
          deleteHandler={deleteHandler}
          setVisibleReminder={setVisibleDeleteReminder}
          setChoice={setChoice}
        />
      ) : null}
      {modalIsOpen ? (
        <ExplainModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          title={'Тренинг “Точка внимания”'}
          text={
            <Text>
              1. Вначале старайся смотреть на Точку, не отрывая взгляда от нее,
              не менее 30 секунд. Опыт показывает - нетренированный человек
              обычно может непрерывно смотреть на точку от 20 до 40 секунд.
              Поэтому «планка в 30 секунд» большинству вполне посильна. Смог
              удерживать внимание 30 секунд – прекрасно! Порадуйся успеху. Это
              поможет продвижению. Не получилось непрерывно смотреть 30 секунд,
              упражнение считается невыполненным. Хоть одно малейшее отвлечение
              нарушает условие непрерывности наблюдения. Надеемся, что планка в
              30 секунд будет быстро достигнута. За одну тренировку старайся
              делать три – пять упражнений. А между ними делай перерывы на 10 –
              20 секунд. Давай глазам отдых. И себе тоже. Пробуй, пока этот
              результат не станет устойчиво выполнимым.{'\n'}
              2. Как только освоен период в 30 секунд, переходи к задаче держать
              непрерывное внимание на точке не менее минуты. Остальные условия
              те же. Помни про отдых для глаз.{'\n'}
              3. И двигайся далее.{'\n'}
              Ориентир: с помощью тренировок за месяц можно научиться удерживать
              внимание на точке до четырех - пяти минут.{'\n'}
              4. Отслеживай свои результаты - это поможет тебе видеть прогресс и
              радоваться успехам!
            </Text>
          }
        />
      ) : null}
      <ScrollView
        style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        <View style={styles.wrapper}>
          <AdditionalInformation
            text={[
              <Text style={{fontSize: 14}}>
                Задача - смотреть на черную точку. Внимательно, не отрывая глаз.
                Это отлично тренирует внимание и волю.
              </Text>,
            ]}
          />
          <View style={styles.speed}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (start) {
                  setStart(false);
                }
                setSpeed(30);
              }}>
              <View
                style={[
                  styles.x1Btn,
                  styles[
                    speed === 30
                      ? 'speedActive'
                      : 'speedNoActive'
                  ],
                ]}>
                <Text
                  style={[
                    styles.xnBtnText,
                    {color: speed === 30 ? '#fff' : '#05B9F0'},
                  ]}>
                  30 секунд
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{color: '#05B9F0', fontFamily: 'Nunito-SemiBold'}}>
                Длительность:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (start) {
                      setStart(false);
                    }
                    setSpeed(60);
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 60
                          ? 'speedActive'
                          : 'speedNoActive'
                      ],
                      {marginRight: 7},
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 60 ? '#fff' : '#05B9F0'},
                      ]}>
                      x2
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (start) {
                      setStart(false);
                    }
                    setSpeed(120);
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 120
                          ? 'speedActive'
                          : 'speedNoActive'
                      ],
                      {marginRight: 7},
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 120 ? '#fff' : '#05B9F0'},
                      ]}>
                      x4
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!start) {
                      setSpeed(240);
                    }
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 240
                          ? 'speedActive'
                          : start
                          ? 'speedLock'
                          : 'speedNoActive'
                      ],
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 240 ? '#fff' : '#05B9F0'},
                      ]}>
                      x8
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={styles.timer}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                height: 250,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {starOrPoint === 'star' ? <TrainingStar /> : <BlackPoint />}
            </View>

            {start ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  setStart(false);
                }}>
                <View style={[styles.startBtn, {backgroundColor: '#FF4242'}]}>
                  <Text style={styles.startBtnText}>Стоп</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setStart(!start);
                  setStarOrPoint('point');
                  setDateStart(new Date());
                }}>
                <View style={[styles.startBtn, {backgroundColor: '#58D181'}]}>
                  <Text style={styles.startBtnText}>Старт</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            <Explanations
              color={'#05B9F0'}
              modalOpen={setModalIsOpen}
              colorBgC={'#F8F8F8'}
            />
          </View>
          <View style={styles.resultWrapper}>
            <View>
              <View style={styles.btnWrapper}>
                <Text style={styles.result}>Результаты</Text>
                {choice ? (
                  <Text
                    style={styles.choice}
                    onPress={() => setVisibleDeleteReminder(true)}>
                    Удалить
                  </Text>
                ) : (
                  <Text style={styles.choice} onPress={() => setChoice(true)}>
                    Выбрать
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: '#F5F5F5',
                  marginVertical: 10,
                }}
              />
            </View>
            <View style={{flexDirection: 'column-reverse'}}>
              {tr.map(m => m)}
            </View>
          </View>
        </View>
      </ScrollView>
    </Header>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 23,
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  timer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 17,
    paddingBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  speed: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startBtn: {
    width: '100%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 18,
    borderRadius: 4,
  },
  startBtnText: {
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
  },
  explanations: {
    backgroundColor: '#F8F8F8',
    color: '#B7B7B7',
    fontFamily: 'Nunito-SemiBold',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  x1Btn: {
    width: '48%',
    paddingHorizontal: '4%',
    paddingVertical: 20,
    borderRadius: 5,
  },
  xnBtnText: {
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
  },
  xnBtn: {
    width: 45,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  speedActive: {
    backgroundColor: '#05B9F0',
    shadowColor: '#05B9F0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  speedNoActive: {
    backgroundColor: '#fff',
  },
  speedLock: {
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  resultWrapper: {
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  result: {
    color: '#05B9F0',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  choice: {
    color: '#FF4242',
    fontFamily: 'Nunito-SemiBold',
  },
  timeWrapper: {
    marginTop: 35,
  },
  timeTitle: {
    fontFamily: 'Nunito-SemiBold',
  },
  timeItemWrapper: {
    flexDirection: 'column-reverse',
  },
  idItem: {
    fontFamily: 'Nunito-Light',
    color: '#05B9F0',
  },
  time: {
    fontFamily: 'Nunito-Light',
    color: '#000',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default PointOfAttention;
