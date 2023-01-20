import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Additional from './Additional';
import AboutProject from './AboutProject';
import StrategicObjective from './StrategicObjective';
import FilesArchiveNavigation from '../FilesArchive/FilesArchiveNavigation';
import ExperienceOthers from './ExperienceOthers';
import WorkRulesAdditional from './WorkRulesAdditional';
import Developers from "./Developers";
import DocumentDetail from "../DocumentDetail";

export const AdditionalNavigate = () => {
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
      }}>
      <Screen
        name="Additional"
        component={Additional}
        options={{title: 'Дополнительное'}}
      />
      <Screen
        name="AboutProject"
        component={AboutProject}
        options={{title: 'Теория к курсу'}}
      />
      <Screen
        name="StrategicObjective"
        component={StrategicObjective}
        options={{title: 'Формы документов'}}
      />
      <Screen
        name="DocumentDetail"
        component={DocumentDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Screen
        name="FilesArchiveNavigation"
        component={FilesArchiveNavigation}
        options={{headerShown: false}}
      />
      <Screen
        name="ExperienceOthers"
        component={ExperienceOthers}
        options={{title: 'Опыт других'}}
      />
      <Screen
        name="WorkRulesAdditional"
        component={WorkRulesAdditional}
        options={{title: 'Правила работы'}}
      />
      <Screen
        name="Developers"
        component={Developers}
        options={{title: 'Разработчик'}}
      />
    </Navigator>
  );
};
