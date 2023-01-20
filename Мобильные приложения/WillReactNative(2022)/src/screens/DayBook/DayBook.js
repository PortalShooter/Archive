import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Arrow from '../../components/Arrow';
import {days, month} from '../../assets/data/date';
import NotesItem from '../../components/Notes/NotesItem';
import Notes from '../../components/Notes/Notes';
import AddNotes from '../../assets/img/AddNotes';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserFilledDays, fetchUserNotes} from '../../redux/dayBook-reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const DayBook = ({navigation}) => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.DayBook.userNotes);
  const tasksActual = useSelector(state => state.Auth.tasksActual);

  const title = tasksActual ? tasksActual.title : {};

  useEffect(() => {
    dispatch(fetchUserFilledDays());
    dispatch(fetchUserNotes());
  }, [dispatch]);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const initialToday = new Date(yyyy + '-' + mm + '-' + dd);

  const [showText, setShowText] = useState(false);
  const [notesIsOpen, setNotesIsOpen] = useState(false);
  const [dateItem, setDateItem] = useState(yyyy + '-' + mm + '-' + dd);
  const date = new Date(dateItem);

  const data = useSelector(state => state.DayBook.userFilledDays);

  const dataObj = [];
  for (const [key, value] of Object.entries(data)) {
    dataObj.push(value);
  }
  const dataObjInCalendar = Array.isArray(data) ? data : dataObj;
  const notesFilter = notes? notes.filter(f => (new Date(f.day) - new Date(dateItem) === 0 ? f : null)) : [];
  const dataFilter = Array.isArray(data) ? data.filter(f => (new Date(f.day) - date === 0 ? f : null)) : dataObj.filter(f => (new Date(f.day) - date === 0 ? f : null));
  const titleFilter = tasksActual ? tasksActual.task_days.filter(f => new Date(f.day) - date === 0 ? f : null,) : null;
  const prevDayHandler = () => {
    const D = new Date(dateItem);
    D.setDate(D.getDate() - 1);
    const result =
      D.getFullYear() +
      '-' +
      (D.getMonth() + 1 < 10 ? '0' + (D.getMonth() + 1) : D.getMonth() + 1) +
      '-' +
      (D.getDate() < 10 ? '0' + D.getDate() : D.getDate());
    setDateItem(result);
  };
  const nextDayHandler = () => {
    const D = new Date(dateItem);
    D.setDate(D.getDate() + 1);
    const result =
      D.getFullYear() +
      '-' +
      (D.getMonth() + 1 < 10 ? '0' + (D.getMonth() + 1) : D.getMonth() + 1) +
      '-' +
      (D.getDate() < 10 ? '0' + D.getDate() : D.getDate());
    setDateItem(result);
  };

  const wish = (value) => {
    if (value === 0) {
      return 0
    } else if (value > 0 && value <= 33) {
      return 'Слабая'
    }else if (value > 33 && value <= 66) {
      return 'Средняя'
    }else if (value > 66) {
      return 'Большая'
    } else {
      return  value + '%'
    }
  }

  return (
    <Header>
      <ScrollView style={styles.wrapper}>
      <KeyboardAwareScrollView style={{height: '100%'}}>
        <View style={styles.arrowFlex}>
          <Text onPress={prevDayHandler}>
            <Arrow rotate={90} color={'#05B9F0'} />
          </Text>

          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('CalendarWrapper', {
                dateItem,
                setDateItem,
                navigation,
                dataObjInCalendar,
                notes,
              })
            }>
            {date - initialToday === 0 ? (
              <Text style={[styles.arrowText, {padding: 10}]}>
                Сегодня,{' '}
                <Text style={styles.arrowBlueText}>
                  {date.getDate()} {month[date.getMonth()]}{' '}
                </Text>
              </Text>
            ) : (
              <Text style={[styles.arrowText, {padding: 10}]}>
                <Text style={styles.arrowBlueText}>
                  {date.getDate()} {month[date.getMonth()]}{' '}
                </Text>
              </Text>
            )}
          </TouchableNativeFeedback>

          <Text onPress={nextDayHandler}>
            <Arrow rotate={-90} color={'#05B9F0'} />
          </Text>
        </View>
        {titleFilter.length ? (
          <Text style={styles.case}>Дело: {title}</Text>
        ) : (
          <Text style={styles.case} />
        )}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={() => setShowText(!showText)}>
          <View
            style={[
              styles.arrowFlex,
              styles.arrCont,
              {borderRadius: showText ? 0 : 5},
            ]}>
            <Text style={[styles.arrowBlueText, {fontSize: 16}]}>
              Учет результатов выполнения
            </Text>
            <Arrow rotate={showText ? 180 : 0} />
          </View>
        </TouchableHighlight>
        <View
          style={[
            {
              backgroundColor: '#fff',
              padding: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            },
            {display: showText ? 'flex' : 'none'},
          ]}>
          <Text style={[styles.arrowText, {marginBottom: 27}]}>
            {date.getDate()} {month[date.getMonth()]}, {days[date.getDay()]}
          </Text>
          <View style={styles.itemFlex}>
            <Text style={styles.executionResultText}>
              Фактическое время начала дела:
            </Text>
            <Text style={styles.executionResultGreenText}>
              {dataFilter[0] ? dataFilter[0].start_time.substr(0, 5) : '-'}
            </Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.executionResultText}>Объем выполнения</Text>
            <Text style={styles.executionResultGreenText}>
              {dataFilter[0] ? dataFilter[0].completion_rate + '%' : '-'}
            </Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.executionResultText}>
              Сила нежеланий{'\n'}приступать к делу
            </Text>
            <Text style={styles.executionResultGreenText}>
              {dataFilter[0] ? wish(dataFilter[0].unwillingness_rate)  : '-'}
            </Text>
          </View>
          <View style={styles.textInputWrapper}>
            <Text style={styles.executionResultText}>Иные помехи</Text>
            <Text style={styles.textInput}>
              {dataFilter[0] ? dataFilter[0].interference : ''}
            </Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.executionResultText}>
              Сила желаний сделать дело
            </Text>
            <Text style={styles.executionResultGreenText}>
              {dataFilter[0] ? wish(dataFilter[0].willingness_rate) : '-'}
            </Text>
          </View>
          {dataFilter[0] ? (
            dataFilter[0].is_get_joy === -1 ? null : (
              <View style={styles.itemFlex}>
                <Text style={styles.executionResultText}>
                  Удалось порадоваться?
                </Text>
                <Text style={styles.executionResultGreenText}>
                  {dataFilter[0].is_get_joy === 0 ? 'Нет' : 'Да'}
                </Text>
              </View>
            )
          ) : null}
        </View>
        {notesFilter
          ? notesFilter.map((item, index) => (
              <NotesItem key={item.id} idItem={index} text={item.text} />
            ))
          : null}
        {notesIsOpen ? (
          <Notes
            setNotesIsOpen={setNotesIsOpen}
            notes={notesFilter}
            date={dateItem}
          />
        ) : null}
        {notesIsOpen ? null : (
          <TouchableHighlight
            style={{marginVertical: 20}}
            activeOpacity={1}
            underlayColor="transparent"
            onPress={() => setNotesIsOpen(!notesIsOpen)}>
            <View style={styles.addFlex}>
              <AddNotes />
              <Text style={styles.addText}>Добавить запись</Text>
            </View>
          </TouchableHighlight>
        )}
        </KeyboardAwareScrollView>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  arrowFlex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 19,
    alignItems: 'center',
  },
  arrCont: {
    padding: 20,
    marginTop: 29,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  arrowText: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  arrowBlueText: {
    color: 'rgba(5, 185, 240, 1)',
    fontFamily: 'Nunito-Bold',
  },
  case: {
    color: 'rgba(133, 133, 133, 1)',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  executionResultText: {
    fontFamily: 'Nunito-Regular',
  },
  executionResultGreenText: {
    color: 'rgba(88, 209, 129, 1)',
    fontFamily: 'Nunito-Bold',
  },
  itemFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 13,
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: 21,
    paddingVertical: 15,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    marginVertical: 10,
    color: '#000',
  },
  notesWrapper: {
    padding: 21,
  },
  clearButton: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'rgba(196, 196, 196, 1)',
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
  },
  addFlex: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  addText: {
    color: 'rgba(5, 185, 240, 1)',
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Nunito-Semibold',
  },
});
export default DayBook;
