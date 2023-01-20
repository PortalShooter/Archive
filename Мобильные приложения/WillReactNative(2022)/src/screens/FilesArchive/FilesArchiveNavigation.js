import React, {useEffect} from 'react';

import Run from './Components/Run';
import Regulations from '../../components/Regulations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilesArchive from './FilesArchive';
import {useDispatch, useSelector} from "react-redux";
import {getNumberTasks} from "../../redux/auth-reducer";

const FilesArchiveNavigation = () => {
  const SettingsStack = createNativeStackNavigator();

  const dispatch = useDispatch();
  const allTasks = useSelector(state => state.Auth.allTasks);
  useEffect(() => {
    dispatch(getNumberTasks())
  }, [dispatch]);

  const linkItem = allTasks.map(m =>
    <SettingsStack.Screen
      name={m.title}
      component={Run}
      options={{title: m.title}}
    />
  );
  return (
    <SettingsStack.Navigator
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
      <SettingsStack.Screen
        name="FilesArchive"
        component={FilesArchive}
        options={{title: 'Архив дел'}}
      />
      {linkItem}
      <SettingsStack.Screen
        name="Regulations"
        component={Regulations}
        options={{title: 'Правила'}}
      />
    </SettingsStack.Navigator>
  );
};

export default FilesArchiveNavigation;
