import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import CodeEntry from './components/CodeEntry';
import Header from '../../components/Header';

import stylesGeneral from './../../assets/stylesGeneral';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkPhone,
  fetchUser,
  getTasksActual,
  setDescriptionTask,
  setStartDate,
  setStatus,
  setTasksActual,
  setTitleTask,
  setWeekNumber,
} from '../../redux/auth-reducer';
import LoaderGray from "../../components/LoaderGray";

const PhoneCodeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.Auth.error);
  const tasksActual = useSelector(state => state.Auth.tasksActual);

  const phoneNumber = useSelector(state => state.Auth.phoneNumber);
  const phone = phoneNumber.replace(/[\D]+/g, '');
  const [time, setTime] = useState(60);
  const [code, setCode] = useState('');
  const preloader = useSelector(state => state.Auth.preloader);
  const user = useSelector(state => state.Auth.user);

  const activated = useSelector(state => state.Auth.acivated);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  });
  useEffect(() => {
    if (user.token) {
      dispatch(getTasksActual());
    }
  }, [user]);
  useEffect(() => {
    if (activated === false) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'SuccessRegist',
          },
        ],
      });
    } else if (activated === true) {
      if (!preloader && tasksActual !== undefined) {
        if (tasksActual === null) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'SuccessRegist',
              },
            ],
          });
          dispatch(setStatus(''));
        } else {
          dispatch(setTasksActual(tasksActual));
          dispatch(setStartDate(tasksActual.start_date));
          dispatch(setTitleTask(tasksActual.title));
          dispatch(setDescriptionTask(tasksActual.description));
          dispatch(setWeekNumber(tasksActual.weeks_number));
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Navigation',
              },
            ],
          });
          dispatch(setStatus(''));
        }
      }
    }
  }, [activated]);

  const repeatHandler = () => {
    dispatch(checkPhone(phone));
    setTime(60);
  };

  const entryHandler = () => {
    if (code.length === 4) {
      dispatch(fetchUser(phone, code));
    }
  };

  if (preloader) {
    return <LoaderGray />;
  } else {
    return (
      <Header>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>На номер </Text>
            <Text style={styles.textBold}>{phoneNumber}</Text>
            <Text style={styles.text}>отправлен код подтверждения</Text>
            <View style={styles.wrapperSms}>
              <CodeEntry keyboard={'number-pad'} count={4} setCode={setCode} />
            </View>
            <Text style={styles.blueText}>Введи SMS-код</Text>
            {error ? <Text>{error}</Text> : null}
            <View style={styles.wrapperFlex}>
              <Text style={styles.textCode}>Не пришел код? </Text>
              {time === 0 ? (
                <Text
                  onPress={repeatHandler}
                  style={[styles.grayText, {color: '#58D181'}]}>
                  Отправить еще раз
                </Text>
              ) : (
                <Text style={styles.grayText}>
                  Отправить еще раз (00:{time < 10 ? '0' + time : time})
                </Text>
              )}
            </View>
            <Text style={stylesGeneral.blueButton} onPress={entryHandler}>
              Далее
            </Text>
          </View>
        </View>
      </Header>
    );
  }
};

export default PhoneCodeScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 42,
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 41,
  },
  wrapperFlex: {
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperSms: {
    height: 102,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    width: '100%',
    textAlign: 'center',
  },
  textBold: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    width: '100%',
    marginBottom: 3,
  },
  code: {
    marginTop: 40,
  },
  blueText: {
    marginBottom: 51,
    color: '#05B9F0',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  grayText: {
    color: '#BEBEBE',
    fontFamily: 'Nunito-Regular',
  },
  textCode: {
    fontFamily: 'Nunito-Regular',
  },
});
