import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './src/components/Navigation';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getNumberTasks,
  setDescriptionTask,
  setStartDate,
  setTasksActual,
  setTitleTask,
  setWeekNumber,
} from './src/redux/auth-reducer';
import CalendarWrapper from './src/screens/DayBook/CalendarWrapper';
import {AdditionalNavigate} from './src/screens/Additional/AdditionalNavigate';
import {Loader} from './src/components/Loader';
import SchemeOfWorkScreen from './src/screens/Registration/SchemeOfWorkScreen';
import PhoneNumberScreen from './src/screens/Registration/PhoneNumberScreen';
import PhoneCodeScreen from './src/screens/Registration/PhoneCodeScreen';
import SuccessRegist from './src/screens/Registration/SuccessRegist';
import CodeActivate from './src/screens/Registration/CodeActivate';
import WorkRules from './src/screens/Registration/WorkRules';
import DateStart from './src/screens/DatePicker/DateStart';
import СaseTask from './src/screens/DatePicker/СaseTask';
import ChoiceName from './src/screens/DatePicker/ChoiceName';
import PrivacyPolicy from './src/screens/Registration/components/PrivacyPolicy';
import PersonalDataProcessing from './src/screens/Registration/components/ PersonalDataProcessing';
import Planning from './src/screens/Planning';

import PushNotification, {Importance} from 'react-native-push-notification';
import ToDoList from "./src/screens/ToDoList";

export const MainApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const {Screen, Navigator} = createNativeStackNavigator();
  const [userLog, setUserLog] = useState('loader');
  const [delay, setDelay] = useState(true)

  useEffect(() => {
    asyncStore();
    SplashScreen.hide();
  }, [dispatch]);

  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        setDelay(false)
      }, 3000)
    }
  }, [delay])

  PushNotification.createChannel({
    channelId: 'firstSaturday', // (required)
    channelName: 'Уведомления', // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });
  PushNotification.createChannel({
    channelId: 'secondSaturday', // (required)
    channelName: 'Уведомления', // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });
  PushNotification.createChannel({
    channelId: 'thirdNotification', // (required)
    channelName: 'Уведомления', // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });

  async function asyncStore() {
    const token = await AsyncStorage.getItem('token');
    let tasksActual = await AsyncStorage.getItem('@tasksActual');
    if (tasksActual === 'null') {
      tasksActual = null;
    }
    if (tasksActual != null && token) {
      tasksActual = JSON.parse(tasksActual);

      dispatch(setTasksActual(tasksActual));
      dispatch(setStartDate(tasksActual.start_date));
      dispatch(setTitleTask(tasksActual.title));
      dispatch(setDescriptionTask(tasksActual.description));
      dispatch(setWeekNumber(tasksActual.weeks_number));
      dispatch(getNumberTasks());
    }
    console.log(token);
    if (token) {
      if (tasksActual && Object.keys(tasksActual).length !== 0) {
          if (tasksActual.description) {
            setUserLog('Navigation');
          } else {
            setUserLog('FirstPlanning');
          }
      } else {
        setUserLog('SchemeOfWorkScreen');
      }
    } else {
      setUserLog('PhoneNumberScreen');
    }
  }

  if (delay || userLog === 'loader') {
    return <Loader />;
  } else {
    return (
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Nunito-ExtraBold',
            },
          }}
          initialRouteName={userLog}>
          <Screen
            name="Navigation"
            component={Navigation}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="AdditionalNavigate"
            component={AdditionalNavigate}
            options={{headerShown: false}}
          />

          <Screen
            name="CalendarWrapper"
            component={CalendarWrapper}
            options={{title: 'Дневник'}}
          />

          <Screen
            name="PhoneNumberScreen"
            component={PhoneNumberScreen}
            options={{
              title: 'Регистрация',
              headerBackVisible: false,
            }}
          />
          <Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{
              title: 'Политика конфиденциальности',
            }}
          />
          <Screen
            name="PersonalDataProcessing"
            component={PersonalDataProcessing}
            options={{
              title: 'Обработка персональных данных',
            }}
          />
          <Screen
            name="PhoneCodeScreen"
            component={PhoneCodeScreen}
            options={{title: 'Регистрация'}}
          />
          <Screen
            name="SuccessRegist"
            component={SuccessRegist}
            options={{title: 'Приветствие'}}
          />
          <Screen
            name="CodeActivate"
            component={CodeActivate}
            options={{title: 'Активация'}}
          />
          <Screen
            name="WorkRules"
            component={WorkRules}
            options={{title: 'Правила работы'}}
          />
          <Screen
            name="SchemeOfWorkScreen"
            component={SchemeOfWorkScreen}
            options={{title: 'Схема работы'}}
          />
          <Screen
            name="DateStart"
            component={DateStart}
            options={{title: 'Выбор даты старта'}}
          />
          <Screen
            name="СaseTask"
            component={СaseTask}
            options={{title: 'Выбор дела'}}
          />
          <Screen
            name="ChoiceName"
            component={ChoiceName}
            options={{title: 'Выбор названия и времени'}}
          />
          <Screen
            name="FirstPlanning"
            component={Planning}
            options={{title: 'Планирование'}}
          />
          <Screen
              name="ToDoList"
              component={ToDoList}
              options={{title: 'Перечень важных дел'}}
          />
        </Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
