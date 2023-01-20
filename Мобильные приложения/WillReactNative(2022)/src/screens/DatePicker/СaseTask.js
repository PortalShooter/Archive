import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import AdditionalInformation from '../../components/AdditionalInformation';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Arrow from '../../components/Arrow';
import stylesGeneral from '../../assets/stylesGeneral';
import {getTasks, setFirstDayTitle} from '../../redux/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import LoaderElement from '../../components/LoaderElement';

const СaseTask = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [loadTask, setLoadTask] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  let tasks;
  let setTasks = useSelector(state => state.Auth.tasks);
  if (setTasks) {
    tasks = setTasks.map((item, index) => {
      return (
        <View key={'task' + item.id} style={styles.blockWrapper}>
          <View style={styles.blockCase}>
            <BouncyCheckbox
              disableBuiltInState
              size={30}
              fillColor="#58D181"
              unfillColor="#F8F8F8"
              iconStyle={{borderColor: 'transparent'}}
              isChecked={checked === index}
              onPress={() => {
                setChecked(index);
                dispatch(
                  setFirstDayTitle(
                    item.title,
                    item.description,
                    item.id,
                    item.min_time_in_minutes,
                  ),
                );
              }}
            />
            <Text style={styles.caseText}>{item.title}</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                if (showText === index) {
                  setShowText(false);
                } else {
                  setShowText(index);
                }
              }}>
              <Arrow rotate={showText === index ? 180 : 0} />
            </TouchableHighlight>
          </View>
          <View
            style={[
              styles.descWrapper,
              {display: showText === index ? 'flex' : 'none'},
            ]}>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        </View>
      );
    });
  } else {
    tasks = (
      <View>
        <View style={{paddingHorizontal: 26, marginTop: '5%'}}>
          <View
            style={[
              styles.blockCase,
              {height: 60, position: 'relative', width: '100%'},
            ]}>
            <LoaderElement show={loadTask} style={{position: 'absolute'}} />
          </View>
        </View>

        <View style={{paddingHorizontal: 26, marginTop: '5%'}}>
          <View
            style={[
              styles.blockCase,
              {height: 60, position: 'relative', width: '100%'},
            ]}>
            <LoaderElement show={loadTask} style={{position: 'absolute'}} />
          </View>
        </View>

        <View style={{paddingHorizontal: 26, marginTop: '5%'}}>
          <View
            style={[
              styles.blockCase,
              {height: 60, position: 'relative', width: '100%'},
            ]}>
            <LoaderElement show={loadTask} style={{position: 'absolute'}} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <Header>
      <View style={styles.wrapper}>
        <ScrollView>
          <AdditionalInformation
            text={['Нужно выбрать полезное вам новое (непривычное) дело.']}
          />
          {tasks}
          <View style={styles.wrapperBtn}>
            <Text
              style={[
                stylesGeneral.blueButton,
                checked === false ? {backgroundColor: '#BCBCBC'} : null,
                {marginTop: 39},
              ]}
              onPress={() => {
                if (checked !== false) {
                  navigation.navigate('ChoiceName');
                }
              }}>
              Подтвердить
            </Text>
          </View>
        </ScrollView>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: '5%',
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  blockWrapper: {
    backgroundColor: '#fff',
    paddingLeft: 26,
    paddingTop: '4.5%',
    paddingBottom: '4.5%',
    marginHorizontal: 20,
    marginTop: '5%',
    borderRadius: 5,
  },
  blockCase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caseText: {
    textAlignVertical: 'center',
    marginRight: 'auto',
    paddingRight: 100,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  descWrapper: {
    width: '100%',
    paddingTop: '5.5%',
    paddingRight: 26,
  },
  desc: {
    fontFamily: 'Nunito-Light',
  },
  wrapperBtn: {
    paddingHorizontal: '10%',
    marginTop: 'auto',
    marginBottom: '3%',
  },
});

export default СaseTask;
