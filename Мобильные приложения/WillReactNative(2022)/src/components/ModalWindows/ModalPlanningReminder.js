import React from 'react';
import stylesGeneral from '../../assets/stylesGeneral';
import {Modal, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {setVisibleReminderAC} from "../../redux/homePage-reducer";
import {setBlockPlan, setChangePlanning} from "../../redux/auth-reducer";

const ModalPlanningReminder = ({navigation, setVisibleReminder, sunday}) => {
  const dispatch = useDispatch();

  const visibleHandler =  async () => {
    await AsyncStorage.setItem('@todayReminder', '1');
    await AsyncStorage.setItem('@timeReminder',  JSON.stringify(new Date().setHours(new Date().getHours() + 1)));
    setVisibleReminder(false)
  };
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={[styles.modalWarningWrapper, {height: sunday === 0 ? 172 : 208}]}>
          <Text style={styles.modalTitle}>
            Пришло время составить план на следующую неделю!
          </Text>
          <Text
            onPress={async () => {
              dispatch(setVisibleReminderAC(false));
              setVisibleReminder(false);
              await AsyncStorage.setItem('@todayReminder',  sunday === 6? '1' : '2');
              await AsyncStorage.setItem('@timeReminder',  JSON.stringify(new Date()));
              {sunday === 0 ? await dispatch(setBlockPlan(true)) : null}
              {sunday === 0 ? await dispatch(setChangePlanning(true)) : null}
              navigation.navigate('Планирование', {sunday: true})
            }}
            style={[stylesGeneral.blueButton, {marginBottom: 22}]}>
            Перейти в планирование
          </Text>
          {sunday === 0 ? null : <Text style={[styles.modalTitle, { color: '#C4C4C4', marginTop: 0, marginBottom: 0 }]}
                                       onPress={visibleHandler}>Напомнить позже</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
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
    fontFamily: 'Nunito-SemiBold',
  },
});

export default ModalPlanningReminder;
