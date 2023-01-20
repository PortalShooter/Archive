import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import RNRestart from 'react-native-restart';
import Header from '../../components/Header';
import Arrow from '../../components/Arrow';

import LinkPage1 from '../../assets/img/AdditionalPage/LinkPage1';
import LinkPage2 from '../../assets/img/AdditionalPage/LinkPage2';
import LinkPage3 from '../../assets/img/AdditionalPage/LinkPage3';
import VkIcon from '../../assets/img/AdditionalPage/VkIcon';
import TelegramIcon from '../../assets/img/AdditionalPage/TelegramIcon';
import WorldIcon from '../../assets/img/AdditionalPage/WorldIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {HelperFunctions} from '../../components/HelperFunctions';
import AdditionalNavigation from './AdditionalNavigation';
import {getDocuments} from '../../redux/auth-reducer';
import {useDispatch} from 'react-redux';

const Additional = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocuments());
  }, []);

  const logOutHandler = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem('@token');
    } catch (e) {
      console.log(e);
    }
    await navigation.navigate('PhoneNumberScreen');
    await RNRestart.Restart();
  };
  return (
    <Header>
      <SafeAreaView>
        <ScrollView style={styles.wrapper}>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBold',
              textAlign: 'center',
              marginBottom: 18,
              fontSize: 16,
            }}>
            Развитие воли и самоорганизации
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('AboutProject', {navigation})}>
              <View style={[styles.twoBtn, {backgroundColor: '#05B9F0'}]}>
                <View style={styles.twoBtnPoint} />
                <Text style={styles.twoBtnText}>Теория к курсу</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate('StrategicObjective', {navigation})
              }>
              <View style={[styles.twoBtn, {backgroundColor: '#58D181'}]}>
                <View style={styles.twoBtnPoint} />
                <Text style={styles.twoBtnText}>
                  Формы {'\n'}
                  документов
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <TouchableNativeFeedback
            onPress={() => navigation.navigate('ToDoList', {navigation})}>
            <View style={styles.linkWrapper}>
              <View style={{width: 30, height: 30}}>
                <Image style={{width: '100%', height: '100%'}} source={require('../../assets/img/todoimg.png')} />
              </View>

              <Text style={styles.linkPage}>Перечень важных дел</Text>
              <Arrow rotate={270} />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => navigation.navigate('FilesArchiveNavigation')}>
            <View style={styles.linkWrapper}>
              <LinkPage1 />
              <Text style={styles.linkPage}>Архив дел</Text>
              <Arrow rotate={270} />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('ExperienceOthers', {navigation})
            }>
            <View style={styles.linkWrapper}>
              <LinkPage2 />
              <Text style={styles.linkPage}>Опыт других</Text>
              <Arrow rotate={270} />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() =>
              HelperFunctions.openURLButton(
                'http://naporoge.ru/knizhka/reader/',
              )
            }>
            <View style={styles.linkWrapper}>
              <LinkPage3 />
              <Text style={styles.linkPage}>Книга “Тренажер для Я”</Text>
              <Arrow rotate={270} />
            </View>
          </TouchableNativeFeedback>

          <Text
            style={{
              fontFamily: 'Nunito-Light',
              marginBottom: 18,
              marginTop: 15,
            }}>
            Присоединяйтесь к проекту, следите за новостями, общайтесь с
            единомышленниками
          </Text>

          <TouchableNativeFeedback
            onPress={() => {
              HelperFunctions.openURLButton('https://vk.com/naporoge.group');
            }}>
            <View style={[styles.soc, {backgroundColor: '#4D76A1'}]}>
              <VkIcon />
              <Text style={styles.socText}>Группа Вконтакте</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => {
              HelperFunctions.openURLButton('https://t.me/naporoge_volya');
            }}>
            <View style={[styles.soc, {backgroundColor: '#039BE5'}]}>
              <TelegramIcon />
              <Text style={styles.socText}>Telegram чат</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => {
              HelperFunctions.openURLButton('https://naporoge.ru/');
            }}>
            <View style={[styles.soc, {backgroundColor: '#FFC73B'}]}>
              <WorldIcon />
              <Text style={styles.socText}>Сайт проекта “На пороге”</Text>
            </View>
          </TouchableNativeFeedback>

          <Text
            style={[styles.link, {marginTop: 30}]}
            onPress={() => {
              HelperFunctions.openURLButton('mailto:infosch@развитиеволи.рф');
            }}>
            Написать письмо
          </Text>
          <Text
            style={[styles.link]}
            onPress={() =>
              navigation.navigate('PersonalDataProcessing', {navigation})
            }>
            Персональные данные
          </Text>
          <Text
            style={[styles.link]}
            onPress={() => navigation.navigate('PrivacyPolicy', {navigation})}>
            Политика конфиденциальности
          </Text>
          <Text
            style={[styles.link]}
            onPress={() =>
              navigation.navigate('WorkRulesAdditional', {navigation})
            }>
            Правила работы
          </Text>
          {/*<Text*/}
          {/*  style={styles.link}*/}
          {/*  onPress={() => navigation.navigate('Developers', {navigation})}>*/}
          {/*  Разработчик*/}
          {/*</Text>*/}
          <Text
            style={[styles.link, {marginBottom: 150}]}
            onPress={logOutHandler}>
            Выйти из аккаунта
          </Text>
        </ScrollView>
        <AdditionalNavigation navigation={navigation} />
      </SafeAreaView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 33,
  },
  twoBtn: {
    width: '46%',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  twoBtnText: {
    fontSize: 13,
    fontFamily: 'Nunito-ExtraBold',
    color: '#fff',
    top: 0,
    lineHeight: 20,
    height: '100%',
    textAlignVertical: 'center',
  },
  twoBtnPoint: {
    width: 11,
    height: 11,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginRight: 13,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 61,
    paddingLeft: 25,
  },
  linkPage: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    justifyContent: 'flex-start',
    width: 165,
  },
  soc: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    borderRadius: 5,
    marginBottom: 10,
    height: 47,
    alignItems: 'center',
  },
  socText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#fff',
    paddingLeft: 30,
  },
  link: {
    fontFamily: 'Nunito-Regular',
    color: '#727272',
    marginBottom: 22,
  },
});

export default Additional;
