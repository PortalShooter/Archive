import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Orientation from 'react-native-orientation';
import Svg, {G, Path} from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Arrow = props => {
  return (
    <View
      style={{
        width: 25,
        height: 90,
        transform: [{rotate: `${props.rotate}deg`}],
      }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 82.81 275.17"
        fill="#05B9F0">
        <G id="Слой_2" data-name="Слой 2">
          <G id="Слой_1-2" data-name="Слой 1">
            <Path
              className="cls-1"
              d="M74.88,134.6,11.3,7.55A2.8,2.8,0,0,0,6,9.12l14.8,128.26-1.69,15.18L6.93,266.05a2.81,2.81,0,0,0,5.3,1.57L75.64,142.06c1.41-3.09,1.46-2.79.6-4.68Z"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
};

const HomePageVideo = ({
  startDate,
  onStateChange,
  today,
  playing,
  setPlaying,
  setScrollToY,
  id
}) => {
  const [index, setIndex] = useState(0);
  const [indexVideo, setIndexVideo] = useState('eOYVgAwOel0');
  const [videoArr, setVideoArr] = useState(['eOYVgAwOel0']);

  const [viewHeight, setViewHeight] = useState(0);
  const numberTasks = useSelector(state => state.Auth.numberTusks);

  useEffect(async () => {
    const scrollVideoIndex = await AsyncStorage.getItem('@scrollVideo')
    if (numberTasks > 1) {
      setVideoArr(['eOYVgAwOel0', 'OO28kwEV3FA', '5gu_ycAd3qw', 'LYB5cpCqIIU']);
    } else if (startDate < 6) {
      setVideoArr(['eOYVgAwOel0']);
    } else if ((startDate === 6 && startDate <= 13 && today.getHours() >= 9) || (startDate >= 7 && startDate <= 12)) {
      setVideoArr(['eOYVgAwOel0', 'OO28kwEV3FA', 'rF3vb6bxOow']);
      if (scrollVideoIndex !== '12') {
        await AsyncStorage.setItem('@scrollVideo', '1')
        setIndex(1)
        setIndexVideo('OO28kwEV3FA')
      }
    } else if ((startDate === 13 && today.getHours() >= 9) || startDate >= 14) {
      setVideoArr(['eOYVgAwOel0', 'OO28kwEV3FA', '5gu_ycAd3qw', 'LYB5cpCqIIU']);
      if (scrollVideoIndex !== String(id)) {
        await AsyncStorage.setItem('@scrollVideo', '2')
        setIndex(3)
        setIndexVideo('LYB5cpCqIIU')
      }
    }
  }, [today, numberTasks]);

  const nextHandler = () => {
    if (index < 3) {
      setIndex(index + 1);
      setIndexVideo(videoArr[index + 1]);
      setPlaying(false);
    }
  };

  const prevHandler = () => {
    if (index >= 1) {
      setIndex(index - 1);
      setIndexVideo(videoArr[index - 1]);
      setPlaying(false);
    }
  };
  const pagination = () => {
    if (numberTasks > 1) {
      return 4
    } else if ((startDate === 13 && today.getHours() >= 9) || startDate >= 14) {
      return 4;
    } else if (
      (startDate === 6 && startDate <= 13 && today.getHours() >= 9) ||
      (startDate >= 7 && startDate <= 13)
    ) {
      return 3;
    } else {
      return 1;
    }
  };
  return (
    <View style={{position: 'relative'}} onLayout={event => setScrollToY(event.nativeEvent.layout.y)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingBottom: 10,
          alignItems: 'flex-start',
        }}>
        <Text style={[styles.videoTitle]}>Доступные видео</Text>
        <View
          style={
            videoArr.length > 1
              ? {flexDirection: 'row', right: -10}
              : {flexDirection: 'row', right: 10}
          }>
          <Text style={[styles.videoTitle]}>
            {index + 1}/{pagination()}
          </Text>
        </View>
      </View>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {videoArr.length > 1 && (
            <TouchableOpacity
              style={{bottom: 4}}
              activeOpacity={1}
              onPress={() => prevHandler()}>
              {index > 0 ? (
                <Arrow rotate={180} />
              ) : (
                <View style={{width: 25, height: 90}} />
              )}
            </TouchableOpacity>
          )}
          <View
            style={[styles.video, {height: viewHeight}]}
            onLayout={e =>
              setViewHeight((e.nativeEvent.layout.width / 16) * 9)
            }>
            <YoutubePlayer
              width="100%"
              height={viewHeight}
              play={playing}
              videoId={indexVideo}
              onChangeState={onStateChange}
              onFullScreenChange={e =>
                e ? Orientation.lockToLandscape() : Orientation.lockToPortrait()
              }
            />
          </View>
          {videoArr.length > 1 && (
            <TouchableOpacity
              style={{bottom: 4}}
              activeOpacity={1}
              onPress={() => nextHandler()}>
              {index < pagination() - 1 ? (
                <Arrow rotate={0} />
              ) : (
                <View style={{width: 25, height: 90}} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '85%',
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#000',
  },
  arrow: {
    height: 50,
    position: 'relative',
    width: 10,
  },
});

export default HomePageVideo;
