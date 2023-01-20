import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native';
import Header from '../../components/Header';
import Arrow from '../../components/Arrow';
import TimerIcon from '../../assets/img/Trainings/TimerIcon';
import ThreeFinger from '../../assets/img/Trainings/ThreeFinger';
import Pause from '../../assets/img/Trainings/Pause';
import {useDispatch} from 'react-redux';
import {fetchTrainingsIndex} from '../../redux/training-reducer';

const TrainingsPage = ({navigation}) => {
  const dispatch = useDispatch();
  // const training = useSelector(state => state.Training.training_index);
  useEffect(() => {
    dispatch(fetchTrainingsIndex());
  }, [dispatch]);

  return (
    <Header>
      <View style={styles.wrapper}>
        {/*<TouchableNativeFeedback*/}
        {/*  onPress={() => navigation.navigate('TrainTimer', {training})}>*/}
        {/*  <View style={styles.linkWrapper}>*/}
        {/*    <TimerIcon />*/}
        {/*    <Text style={styles.linkPage}>Секундная стрелка</Text>*/}
        {/*    <Arrow rotate={270} />*/}
        {/*  </View>*/}
        {/*</TouchableNativeFeedback>*/}
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('PointOfAttention', {id: 4})}>
          <View style={styles.linkWrapper}>
            <TimerIcon />
            <Text style={styles.linkPage}>Точка внимания</Text>
            <Arrow rotate={270} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('CountUpToThree', {id: 5})}>
          <View style={styles.linkWrapper}>
            <ThreeFinger />
            <Text style={styles.linkPage}>Счет до 3-х</Text>
            <Arrow rotate={270} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('PauseTraining', {id: 6})}>
          <View style={styles.linkWrapper}>
            <Pause />
            <Text style={styles.linkPage}>Пауза</Text>
            <Arrow rotate={270} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 23,
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: '#F8F8F8',
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
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    justifyContent: 'flex-start',
    width: 165,
  },
});

export default TrainingsPage;
