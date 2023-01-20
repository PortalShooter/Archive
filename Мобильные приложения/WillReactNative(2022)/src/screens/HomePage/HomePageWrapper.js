import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuButton from '../../components/MenuButton';
import HomePage from './HomePage';
import Regulations from '../../components/Regulations';
import Total from './Total';

const HomePageWrapper = () => {
  const {Screen, Navigator} = createNativeStackNavigator();
  return (
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
        headerRightContainerStyle: {
          backgroundColor: 'red',
          right: 50,
        },
      }}>
      <Screen
        name="Главная"
        component={HomePage}
        options={{
          title: 'Развитие воли и самоорганизации',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 16,
          },
          headerRight: () => <MenuButton right={4} />,
        }}
      />
      <Screen
        name="Правила"
        component={Regulations}
        options={{
          title: 'Правила',
          headerRight: () => <MenuButton right={4} />,
        }}
      />
      <Screen
        name="Total"
        component={Total}
        options={{
          title: 'Итоги работы',
          headerBackVisible: false,
          // headerRight: () => <MenuButton right={4} />,
        }}
      />
    </Navigator>
  );
};

export default HomePageWrapper;
