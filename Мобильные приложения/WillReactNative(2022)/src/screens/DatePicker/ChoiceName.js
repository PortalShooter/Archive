import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from 'react-native';
import Header from '../../components/Header';
import Svg, {G, Path, Rect, Defs, ClipPath} from 'react-native-svg';
import AdditionalInformation from '../../components/AdditionalInformation';
import stylesGeneral from '../../assets/stylesGeneral';
import {
  deleteTaskActual,
  postTask,
  setFirstNewTitle,
  setPlanningModal,
  setSuccessTask,
  setTimeDay,
} from '../../redux/auth-reducer';
import {store} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import TimePickerItemNew from '../../components/TimePicker/TimePickerItemNew';

const ChoiceName = ({navigation}) => {
  const tasksActual = useSelector(state => state.Auth.tasksActual);
  let homePage = useSelector(state => state.Auth.successTask);
  const dispatch = useDispatch();

  const title = useSelector(state => state.Auth.taskTitle);

  const [modalHour, setModalHour] = useState(null);
  const [modalMinutes, setModalMinutes] = useState(null);
  const [newTitle, setNewTitle] = useState(
    title === 'Другое дело' ? '' : title,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [modalAlert, setModalAlert] = useState(false);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setModalHour(null)
    });
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        dispatch(setSuccessTask(false));
      }),
    [navigation],
  );

  useEffect(() => {
    if (homePage) {
      dispatch(setPlanningModal(true));
      navigation.navigate('FirstPlanning');
    }
  }, [homePage]);

  useEffect(() => {
    if (modalHour) {
      dispatch(setTimeDay(modalHour + ':' + modalMinutes));
    }
  }, [modalHour]);
  return (
    <Header>
      {modalVisible ? (
        <TimePickerItemNew
          setVisible={setModalVisible}
          setHours={setModalHour}
          hours={modalHour}
          setMinutes={setModalMinutes}
          minutes={modalMinutes}
        />
      ) : null}
      <ScrollView style={styles.wrapper}>
        <View style={styles.blockTime}>
          <Text style={styles.textTime}>Укажи краткое название дела</Text>
          <TextInput
            style={styles.input}
            onChangeText={el => {
              setNewTitle(el);
            }}
            defaultValue={title === 'Другое дело' ? '' : title}
            maxLength={40}
          />
          <Text style={styles.textTime}>
            Выбери время начала дела для первого дня:
          </Text>
          <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.choiceTimeBtn}>
              <Text style={styles.choiceTimeText}>
                {modalHour === null
                  ? 'Выбрать время'
                  : modalHour + ':' + modalMinutes}
              </Text>
              <Svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0)">
                  <Path
                    d="M19.6851 5.7887C19.2294 6.00914 19.0387 6.55743 19.2592 7.01286C19.8614 8.25694 20.1667 9.59792 20.1667 11C20.1667 16.0544 16.0544 20.1667 11 20.1667C5.94558 20.1667 1.83333 16.0544 1.83333 11C1.83333 5.94558 5.94558 1.83333 11 1.83333C13.0945 1.83333 15.0621 2.51725 16.6907 3.81101C17.0857 4.12634 17.6633 4.06032 17.9786 3.66398C18.2939 3.26786 18.2279 2.69092 17.8314 2.37604C15.9034 0.843709 13.4772 0 11 0C4.93492 0 0 4.93492 0 11C0 17.0651 4.93492 22 11 22C17.0651 22 22 17.0651 22 11C22 9.3193 21.633 7.70864 20.9092 6.21458C20.6892 5.75804 20.1391 5.56781 19.6851 5.7887Z"
                    fill="white"
                  />
                  <Path
                    d="M11.0002 3.66663C10.4942 3.66663 10.0835 4.07729 10.0835 4.58329V11C10.0835 11.506 10.4942 11.9166 11.0002 11.9166H15.5835C16.0895 11.9166 16.5002 11.506 16.5002 11C16.5002 10.494 16.0895 10.0833 15.5835 10.0833H11.9168V4.58329C11.9168 4.07729 11.5062 3.66663 11.0002 3.66663Z"
                    fill="white"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0">
                    <Rect width="22" height="22" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
            </View>
          </TouchableNativeFeedback>
        </View>
        <AdditionalInformation
          text={[
            'Сейчас идет выбор начала дела для 1-го дня 1-го недельного плана.',
            'Укажи время начала дела точно (час и минуты) - если можешь. Или укажи час, в котором хочешь приступить к делу.',
            'Выбранное время автоматически продублируется на все остальные дни плана',
            'Можешь менять время начала Дела для других дней во вкладке «Планирование»',
            'Время лучше указывать как можно точнее. Час и минуты или час.',
            'Важно! Редактировать план можно только до начала очередной недели. До понедельника!',
          ]}
        />
        <View style={styles.wrapperBtn}>
          <TouchableNativeFeedback
            onPress={() => {
              if (tasksActual) {
                dispatch(deleteTaskActual(tasksActual.id));
              }
              if (modalHour && newTitle.trim()) {
                dispatch(setFirstNewTitle(newTitle));
                dispatch(
                  postTask(
                    store.getState().Auth.startDate,
                    store.getState().Auth.weekNumber,
                    store.getState().Auth.firstDayTime,
                    newTitle,
                    store.getState().Auth.minTimeTask,
                  ),
                );
              } else {
                setModalAlert(true);
              }
            }}>
            <Text
              style={[
                stylesGeneral.blueButton,
                {marginBottom: 40},
                modalHour ? null : {backgroundColor: '#BCBCBC'},
              ]}>
              Перейти в план
            </Text>
          </TouchableNativeFeedback>
        </View>
        {modalAlert && (
          <Modal
            transparent={true}
            animationType={'fade'}
            statusBarTranslucent={true}>
            <View style={styles.modalBg}>
              <View style={styles.modalWarningWrapper}>
                <Text
                  style={{
                    fontFamily: 'Nunito-SemiBold',
                    textAlign: 'center',
                    width: '80%',
                    marginBottom: 22,
                  }}>
                  Не все поля заполнены
                </Text>
                <Text
                  style={[stylesGeneral.blueButton, {marginBottom: 23}]}
                  onPress={() => {
                    setModalAlert(false);
                  }}>
                  Закрыть
                </Text>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </Header>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
  },
  blockTime: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 21,
    paddingTop: 23,
    paddingBottom: 27,
    marginHorizontal: 20,
    marginBottom: 57,
  },
  input: {
    width: '100%',
    height: 42,
    marginBottom: 12,
    paddingHorizontal: 21,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    color: '#000',
  },
  choiceTimeBtn: {
    backgroundColor: '#58D181',
    // backgroundColor: '#BCBCBC',
    height: 42,
    paddingLeft: 24,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
  },
  choiceTimeText: {
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
  },
  textTime: {
    fontFamily: 'Nunito-Light',
    marginBottom: 16,
  },
  wrapperBtn: {
    paddingHorizontal: '10%',
    marginTop: 'auto',
    marginBottom: 10,
  },

  modalBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    paddingHorizontal: 20,
    display: 'flex',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    height: 171,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ChoiceName;
