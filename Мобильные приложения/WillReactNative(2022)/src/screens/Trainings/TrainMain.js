import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrainingsPage from './TrainingsPage';
import TrainTimer from './TrainTimer';
import CountUpToThree from './CountUpToThree';
import PauseTraining from './PauseTraining';
import MenuButton from '../../components/MenuButton';
import PointOfAttention from './ PointOfAttention';

const TrainMain = () => {
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
          right: 50,
        },
      }}>
      <Screen
        name="TrainingsPage"
        component={TrainingsPage}
        initialParams={{}}
        options={{
          title: 'Тренинги',
          headerRight: () => <MenuButton right={4} />,
        }}
      />
      {/*<Screen*/}
      {/*  name="TrainTimer"*/}
      {/*  component={TrainTimer}*/}
      {/*  options={{*/}
      {/*    title: 'Секундная стрелка',*/}
      {/*    headerRight: () => <MenuButton right={4}/>,*/}
      {/*  }}*/}
      {/*/>*/}
      <Screen
        name="PointOfAttention"
        component={PointOfAttention}
        options={{
          title: 'Точка внимания',
          headerRight: () => <MenuButton right={4} />,
        }}
      />
      <Screen
        name="CountUpToThree"
        component={CountUpToThree}
        options={{
          title: 'Счет до 3-х',
          headerRight: () => <MenuButton right={4} />,
        }}
      />
      <Screen
        name="PauseTraining"
        component={PauseTraining}
        options={{
          title: 'Пауза',
          headerRight: () => <MenuButton right={4} />,
        }}
      />
    </Navigator>
  );
};
export default TrainMain;
