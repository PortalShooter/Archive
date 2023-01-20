import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import CalendarModule from '../../components/CalendarModule';
import AdditionalInformation from '../../components/AdditionalInformation';
import stylesGeneral from '../../assets/stylesGeneral';
import {useDispatch, useSelector} from 'react-redux';
import {getNumberTasks, getStartDate} from '../../redux/auth-reducer';
import {month} from '../../assets/data/date';
import WeekPicker from './WeekPicker';
import LoaderGray from "../../components/LoaderGray";

const DateStart = ({navigation}) => {
  const dispatch = useDispatch();

  const numberTasks = useSelector(state => state.Auth.numberTusks);
  const allTask = useSelector(state => state.Auth.allTasks);
  const [windowValue, setWindowValue] = useState();
  const [windowIsOpen, setWindowIsOpen] = useState();
  const [dateValue, setDateValue] = useState('');
  const [dateEndValue, setDateEndValue] = useState('');
  const [period, setPeriod] = useState();
  const [pageActive, setPageActive] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setPageActive(true)
    });
  }, [navigation]);

  useEffect(() => {
    let D = new Date(dateValue);
    let DE = new Date(dateEndValue);
    setPeriod(
      D.getDate() +
        ' ' +
        month[D.getMonth()] +
        ' - ' +
        DE.getDate() +
        ' ' +
        month[DE.getMonth()],
    );
  }, [dateEndValue]);

  useEffect(() => {
    dispatch(getNumberTasks());
    if (numberTasks !== null) {
      if (
        numberTasks === 0 ||
        (allTask.length > 0 && allTask[0].description === null)
      ) {
        setWindowValue(3);
      } else {
        setWindowIsOpen(true);
      }
    }
  }, [numberTasks]);
  if (numberTasks === null) {
    return <LoaderGray />;
  } else {
    return (
      <Header>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <ScrollView scrollToOverflowEnabled={false}>
          <View style={styles.wrapper}>
            <CalendarModule
              dateValue={dateValue}
              setDateValue={setDateValue}
              dateEndValue={dateEndValue}
              setDateEndValue={setDateEndValue}
              windowValue={windowValue}
              component="DateStart"
            />
            <View style={{marginTop: '3.5%'}}>
              <AdditionalInformation
                text={[
                  'Старт курса – только с понедельника. Выберите, с какого понедельника начнете.',
                ]}
              />
            </View>

            <Text style={styles.blueText}>
              Курс: {period === 'NaN undefined - NaN undefined' ? null : period}
            </Text>
            <View style={styles.wrapperBtn}>
              <Text
                style={[
                  stylesGeneral.blueButton,
                  !dateValue && {backgroundColor: '#F3F3F3'},
                ]}
                onPress={() => {
                  if (dateValue) {
                    dispatch(getStartDate(dateValue, windowValue));
                    setPageActive(false)
                    navigation.navigate('СaseTask');
                  }
                }}>
                Подтвердить
              </Text>
            </View>
          </View>
          {windowIsOpen && pageActive && (
            <WeekPicker
              setWindowIsOpen={setWindowIsOpen}
              setWindowValue={setWindowValue}
              windowValue={windowValue}
            />
          )}
        </ScrollView>
      </Header>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#fff',
  },
  blueText: {
    color: '#05B9F0',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    marginTop: '4.5%',
    marginBottom: '4%',
  },
  wrapperBtn: {
    paddingHorizontal: '10%',
  },
});

export default DateStart;
