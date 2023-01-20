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
import Timer from '../../components/Timer/Timer';
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

const TrainTimer = props => {
  const dispatch = useDispatch();
  const trains = useSelector(state => state.Training.trainingDays);
  const trainingId = props.route.params.training[0].id;
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  //счетчик секундомера, запуск пост запроса
  useEffect(async () => {
    let timeDifference = dateEnd - dateStart;
    let totalTime = new Date(timeDifference).toLocaleTimeString().substr(3, 5);
    await setTotalTime(totalTime);
    await setDisp(true);
  }, [dateEnd]);

  let day = new Date();
  let dayNow = new Date().toISOString().slice(0, 10);

  const saveHandler = () => {
    setStart(!start);
    setDateEnd(new Date());
  };
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
          title={'Тренинг “Секундная стрелка”'}
          text={
            <Text>
              1. Вначале старайтесь смотреть на стрелку, не отрывая взгляда от
              нее, в течение не менее 30 секунд. Опыт показывает -
              нетренированный человек обычно в силах внимательно смотреть на
              движение стрелки не более 20 – 40 секунд. Поэтому «планка в 30
              секунд» большинству вполне посильна. {'\n'}
              Не нужно после 30 секунд сразу прекращать упражнение. Определите
              для себя задачу так: смотреть не менее 30 секунд, стараясь
              безотрывно наблюдать 30 – 40 секунд. {'\n'}
              Не получилось непрерывно смотреть 30 секунд, упражнение считается
              невыполненным. Хоть одно малейшее отвлечение нарушает условие
              непрерывности наблюдения. {'\n'}
              Надеемся, что планка в 30 секунд будет быстро достигнута. За одну
              тренировку старайтесь делать три – пять упражнений. А между ними
              делайте перерывы на 10 – 20 секунд.{'\n'}
              Пробуйте, пока этот результат не станет устойчиво выполнимым.{' '}
              {'\n'}
              2. Как только освоен период в 30 секунд, переходите к задаче
              держать непрерывное внимание на стрелке в течение не менее минуты.
              Подход будет тот же, старайтесь удерживать внимание секунд 60 –
              80, зная, что обязательный минимум – это 60 секунд.{'\n'}
              Остальные условия те же.{'\n'}
              3. И двигайтесь далее, прибавляя по 30 – 45 секунд для каждого
              последующего этапа.{'\n'}
              <Text style={{fontFamily: 'Nunito-Bold'}}>Ориентир:</Text> с
              помощью тренировок за месяц можно научиться удерживать внимание на
              секундной стрелке до четырех - пяти минут.{'\n'}
              4. Более сложные варианты – смотреть на стрелку, которая движется
              медленнее – выбирайте разные режимы.{'\n'}
              5. Отмечайте результаты. Это поможет видеть свои успехи.
            </Text>
          }
        />
      ) : null}
      <ScrollView
        style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        <View style={styles.wrapper}>
          <AdditionalInformation
            text={[
              <Text>
                Задача -{' '}
                <Text style={{fontFamily: 'Nunito-Bold'}}>
                  смотреть на секундную стрелку.
                </Text>{' '}
                Внимательно, не отрывая глаз. Это отлично тренирует{' '}
                <Text style={{fontFamily: 'Nunito-Bold'}}>
                  внимание и волю.
                </Text>
              </Text>,
            ]}
          />
          <View style={styles.speed}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (!start) {
                  setSpeed(60);
                }
              }}>
              <View
                style={[
                  styles.x1Btn,
                  styles[
                    speed === 60
                      ? 'speedActive'
                      : start
                      ? 'speedLock'
                      : 'speedNoActive'
                  ],
                ]}>
                <Text
                  style={[
                    styles.xnBtnText,
                    {color: speed === 60 ? '#fff' : '#05B9F0'},
                  ]}>
                  Обычная скорость
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{color: '#05B9F0', fontFamily: 'Nunito-SemiBold'}}>
                Режимы замедления:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!start) {
                      setSpeed(120);
                    }
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 120
                          ? 'speedActive'
                          : start
                          ? 'speedLock'
                          : 'speedNoActive'
                      ],
                      {marginRight: 7},
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 120 ? '#fff' : '#05B9F0'},
                      ]}>
                      x2
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!start) {
                      setSpeed(180);
                    }
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 180
                          ? 'speedActive'
                          : start
                          ? 'speedLock'
                          : 'speedNoActive'
                      ],
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 180 ? '#fff' : '#05B9F0'},
                      ]}>
                      x3
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!start) {
                      setSpeed(300);
                    }
                  }}>
                  <View
                    style={[
                      styles.xnBtn,
                      styles[
                        speed === 300
                          ? 'speedActive'
                          : start
                          ? 'speedLock'
                          : 'speedNoActive'
                      ],
                    ]}>
                    <Text
                      style={[
                        styles.xnBtnText,
                        {color: speed === 300 ? '#fff' : '#05B9F0'},
                      ]}>
                      x5
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={styles.timer}>
            <Timer start={start} speed={speed} />
            {start ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  saveHandler();
                }}>
                <View style={[styles.startBtn, {backgroundColor: '#FF4242'}]}>
                  <Text style={styles.startBtnText}>Стоп</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setStart(!start);
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
    marginTop: 55,
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
    width: 48,
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

export default TrainTimer;
