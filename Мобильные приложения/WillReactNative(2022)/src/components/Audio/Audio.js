import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAudioHelper} from '../../../helpers/audio-helper';
import Stop from '../../assets/img/Stop';
import Play from '../../assets/img/Play';
import Slider from '@sharcoux/slider';
import play from '../../assets/img/Play';
import {setAudioPlay} from '../../redux/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';

function Audio({navigation, trainingName}) {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.Auth.audioPlay);
  const audioWaveFormArr = [
    28, 15, 15, 25, 32, 15, 12, 10, 14, 16, 20, 10, 10, 10, 28, 15, 12, 10, 14,
    18, 20, 10, 10, 10,
  ];
  const [activeItem, setActiveItem] = useState();
  const [pauseRender, setPauseRender] = useState(true);
  const soundArr = [
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/1.mp3'),
      name: '1.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/2.mp3'),
      name: '2.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/3.mp3'),
      name: '3.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/4.mp3'),
      name: '4.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/5.mp3'),
      name: '5.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/6.mp3'),
      name: '6.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/7.mp3'),
      name: '7.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/8.mp3'),
      name: '8.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/9.mp3'),
      name: '9.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/10.mp3'),
      name: '10.mp3',
    },
    {
      type: 'directory',
      path: require('../../../sounds/сountThree/11.mp3'),
      name: '11.mp3',
    },
  ];
  const shuffSoundArr = soundArr.sort(function () {
    return Math.random() - 0.5;
  });
  let player;
  if (trainingName === 'Pause') {
    player = useAudioHelper({
      listSounds: [
        {
          type: 'directory',
          path: require('../../../sounds/PauseSound.mp3'),
          name: 'PauseSound.mp3',
        },
        {
          type: 'directory',
          path: require('../../../sounds/PauseSound.mp3'),
          name: 'PauseSound1.mp3',
        },
      ],
      timeRate: 15,
      isLogStatus: true,
    });
  } else if (trainingName === 'сountThree') {
    player = useAudioHelper({
      listSounds: shuffSoundArr,
      timeRate: 15,
      isLogStatus: true,
    });
  }

  // убирает автоплей при рендере
  useEffect(() => {
    let pauseR = pauseRender ? player.pause() : player.play();
    return () => pauseR;
  });
  // нижняя навигация
  useEffect(() => {
    if (!audioPlay) {
      player.remove();
    }
  });
  // андройдные кнопки навигации
  BackHandler.addEventListener('hardwareBackPress', () => {
    player.reset();
  });
  // выход по кнопке назад headerLeft
  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      player.reset();
    });
  });
  useEffect(() => {
    navigation.addListener('blur', () => {
      setAudioPlay(false)
    });
  }, [])

  useEffect(() => {
    // коль-во времени на 1 палку, зависит от количества элементов в массиве audioWaveFormArr
    let oneElementWave = (player.duration / 100) * 4.16666667;
    // индекс закрашенных элементов
    let shadedElementIndex = player.currentTime / oneElementWave;
    setActiveItem(shadedElementIndex);
  }, [player.currentTime]);

  return (
    <View style={styles.container}>
      {player.status === 'play' ? (
        <TouchableOpacity
          onPress={() => {
            setPauseRender(true);
          }}
          style={{marginRight: 20}}>
          <Stop />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            dispatch(setAudioPlay(true));
            setPauseRender(false);
          }}
          style={{marginRight: 20}}>
          <Play />
        </TouchableOpacity>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          left: 59,
        }}>
        {audioWaveFormArr.map((item, index) =>
          activeItem >= index ? (
            <View
              key={index}
              style={{
                backgroundColor: '#58D181',
                width: 2,
                height: item,
                marginLeft: 7.3,
              }}
            />
          ) : (
            <View
              key={index}
              style={{
                backgroundColor: '#05B9F0',
                width: 2,
                height: item,
                marginLeft: 7.3,
              }}
            />
          ),
        )}
      </View>

      <View style={styles.progressBar}>
        <Slider
          style={{opacity: 0}}
          minimumValue={0}
          maximumValue={player.duration}
          value={player.currentTime}
          onValueChange={value => player.seekToTime(value)}
          trackHeight={50}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 10,
  },

  progressBar: {
    flexDirection: 'row',
    width: 222,
    height: 50,
  },
});

export default Audio;
