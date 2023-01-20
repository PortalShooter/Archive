import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TimePickerItemNew from '../../components/TimePicker/TimePickerItemNew';
import Clock from '../../assets/img/Clock';
import MultiSliderHomePage from './MultiSliderHomePage';
import stylesGeneral from '../../assets/stylesGeneral';
import { useSelector } from "react-redux";
import ChoiceBtns from "./ChoiceBtns";

const HomePageResultModal = ({
  setVisibleTimePicker,
  visibleTimePicker,
  setHours,
  hours,
  setMinutes,
  minutes,
  completionRate,
  setCompletionRate,
  unwillingnessRate,
  setUnwillingnessRate,
  inputValue,
  setInputValue,
  willingnessRate,
  setWillingnessRate,
  startDate,
  today,
  moodValue,
  setMoodValue,
  errorValue,
  saveHandler,
  error,
}) => {
  const numberTasks = useSelector(state => state.Auth.numberTusks);
  return (
    <View style={{padding: 20}}>
      {visibleTimePicker ? (
        <TimePickerItemNew
          setVisible={setVisibleTimePicker}
          setHours={setHours}
          hours={hours}
          setMinutes={setMinutes}
          minutes={minutes}
        />
      ) : null}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setVisibleTimePicker(true)}
        style={styles.actualStartTime}>
        {hours ? (
          <Text style={styles.actualStartTimeText}>
            {hours + ':' + minutes}
          </Text>
        ) : (
          <Text style={styles.actualStartTimeText}>
            Фактическое время начала дела:
          </Text>
        )}
        <Clock />
      </TouchableOpacity>
      <MultiSliderHomePage
        title={'Объем выполнения'}
        value={completionRate}
        setValue={setCompletionRate}
      />
      <ChoiceBtns
          title={'Сила нежеланий приступать к делу'}
          value={unwillingnessRate}
          setValue={setUnwillingnessRate}
      />
      <View style={styles.textInputWrapper}>
        <Text style={styles.textMin}>Иные помехи</Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          multiline={true}
          maxLength={500}
          numberOfLines={7}
          placeholder={'Запиши все, что мешало выполнять дело'}
          style={styles.textInput}
        />
        <Text style={{position: 'absolute', right: 20, bottom: 30, color: 'rgba(175,172,172,0.88)'}}>{inputValue.length}/500</Text>
      </View>
      <ChoiceBtns
          title={'Сила желаний сделать дело'}
          value={willingnessRate}
          setValue={setWillingnessRate}
      />
      <View style={styles.moodWrapper}>
        {(startDate === 13 && today.getHours() >= 9) || startDate >= 14 || numberTasks > 1 ? (
          <View>
            <Text style={styles.textMin}>Удалось порадоваться?</Text>
            <View style={styles.moodFlex}>
              <Text
                style={[
                  moodValue === 1 ? styles.moodItemActive : styles.moodItem,
                  {marginRight: 10},
                ]}
                onPress={() => setMoodValue(1)}>
                Да
              </Text>
              <Text
                style={[
                  moodValue === 0 ? styles.moodItemActive : styles.moodItem,
                ]}
                onPress={() => setMoodValue(0)}>
                Нет
              </Text>
            </View>
          </View>
        ) : null}
        <Text
          style={[stylesGeneral.blueButton, {marginBottom: 0}]}
          onPress={saveHandler}>
          Сохранить результаты
        </Text>
        {error ? (
          <Text
            style={{
              fontSize: 12,
              marginBottom: 30,
              fontFamily: 'Nunito-Regular',
              color: '#FF4440',
            }}>
            {errorValue}
          </Text>
        ) : (
          <Text />
        )}
      </View>
    </View>
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

  actualStartTime: {
    backgroundColor: '#58D181',
    height: 42,
    borderRadius: 37,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
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
    fontFamily: 'Nunito-Light',
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
    color: '#000'
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

export default HomePageResultModal;
