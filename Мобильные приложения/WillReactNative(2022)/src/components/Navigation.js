import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../assets/img/Home';
import Book from '../assets/img/Book';
import CalendarIcon from '../assets/img/CalendarIcon';
import Statistical from '../assets/img/Statistical';
import Star from '../assets/img/Star';
import Statistics from '../screens/Statistics/Statistics';
import MenuButton from './MenuButton';
import Planning from '../screens/Planning';
import DayBook from '../screens/DayBook/DayBook';
import TrainMain from '../screens/Trainings/TrainMain';
import HomePageWrapper from '../screens/HomePage/HomePageWrapper';
import {useDispatch, useSelector} from 'react-redux';
import { getTasksActual, setAudioPlay, setChangeModal } from "../redux/auth-reducer";
import NetInfo from '@react-native-community/netinfo';
import LoaderGray from "./LoaderGray";

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const preloader = useSelector(state => state.Auth.preloader);
  const tabBtn = useSelector(state => state.Auth.tabBtn);
  const changePlanning = useSelector(state => state.Auth.changePlanning);
  const tasksActual = useSelector(state => state.Auth.tasksActual);
  const audioPlay = useSelector(state => state.Auth.audioPlay);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && tasksActual.id === '') {
        dispatch(getTasksActual());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  function checkClick(e) {
    if (tabBtn) {
      e.preventDefault();
    }
    if (changePlanning) {
      e.preventDefault();
      dispatch(setChangeModal(true));
    }
    if (audioPlay) {
      dispatch(setAudioPlay(false))
    }
  }

  if (preloader) {
    return <LoaderGray />;
  } else {
    return (
      <Tab.Navigator
        screenOptions={{
          headerTransparent: true,
          tabBarActiveTintColor: '#05B9F0',
          tabBarInactiveTintColor: '#E5E5E5',
          tabBarShowLabel: false,
          tabBarAllowFontScaling: false,
          tabBarHideOnKeyboard: true,
          headerShow: false,
          headerShadowVisible: false,
          tabBarStyle: {
            height: 85,
            paddingVertical: 10,
            borderTop: 1,
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: '800',
            fontFamily: 'Nunito-ExtraBold',
            // top: 200,
            // position: 'absolute',
          },
        }}>
        <Tab.Screen
          name="Главная"
          component={HomePageWrapper}
          options={{
            tabBarIcon: ({color}) => {
              return <Home fill={color} />;
            },
            title: '',
            headerRight: () => <MenuButton />,
            headerShown: false,
          }}
          listeners={{
            tabPress: e => {
              checkClick(e);
            },
          }}
        />
        <Tab.Screen
          name="Планирование"
          component={Planning}
          options={{
            tabBarIcon: ({color}) => {
              return <CalendarIcon fill={color} />;
            },
            headerRight: () => <MenuButton />,
          }}
          listeners={{
            tabPress: e => {
              if (audioPlay) {
                dispatch(setAudioPlay(false))
              }
            },
          }}
        />
        <Tab.Screen
          name="Дневник"
          component={DayBook}
          options={{
            tabBarIcon: ({color}) => {
              return <Book fill={color} />;
            },
            headerRight: () => <MenuButton />,
          }}
          listeners={{
            tabPress: e => {
              checkClick(e);
            },
          }}
        />
        <Tab.Screen
          name="Статистика"
          component={Statistics}
          options={{
            tabBarIcon: ({color}) => {
              return <Statistical fill={color} />;
            },
            headerRight: () => <MenuButton />,
          }}
          listeners={{
            tabPress: e => {
              checkClick(e);
            },
          }}
        />
        <Tab.Screen
          name="Тренинги"
          component={TrainMain}
          options={{
            tabBarIcon: ({color}) => {
              return <Star fill={color} />;
            },
            headerRight: () => <MenuButton />,
            headerShown: false,
          }}
          listeners={{
            tabPress: e => {
              checkClick(e);
            },
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default Navigation;
