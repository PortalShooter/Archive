import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar, Dimensions, SafeAreaView} from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../../components/Header';
import stylesGeneral from './../../assets/stylesGeneral';
import LoaderElement from "../../components/LoaderElement";
import Orientation from "react-native-orientation";

const SchemeOfWorkScreen = ({navigation}) => {
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const widthPage = Dimensions.get('window').width;

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <Header>
      <ScrollView style={styles.wrapper}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <View>
          <View>
            <Text style={styles.text}>
              1. Выбрать из предложенных вариантов или свободно подобрать развивающее дело.
            </Text>
            <Text style={styles.text}>
              2. Составлять недельные планы выполнения дела.
            </Text>
            <Text style={styles.text}>
              3. Стараться делать его и запоминать возникающие нежелания
              приступать к делу, желание отложить его и иные мешающие факторы.
            </Text>
            <Text style={styles.text}>
              4. <Text style={{fontFamily: 'Nunito-Bold'}}>В день выполнения дела</Text> отмечать объем выполнения и
              мешающие
              факторы.
            </Text>
            <Text style={styles.text}>
              5. На основе своих размышлений и с помощью видео тренировать
              умение четко выполнять намеченные дела – независимо от перепадов
              настроений.
            </Text>
            <SafeAreaView>
              <View style={styles.wrapperVideo}>
                <LoaderElement show={showVideo} style={{position: 'absolute'}}/>
                <YoutubePlayer
                  height={widthPage / 2}
                  play={playing}
                  videoId={'eOYVgAwOel0'}
                  onChangeState={onStateChange}
                  onReady={() => setShowVideo(false)}
                  onFullScreenChange={(e) => e ? Orientation.lockToLandscape() : Orientation.lockToPortrait()}
                />
              </View>
            </SafeAreaView>
          </View>

          <View style={styles.buttonWrapper}>
            <Text
              style={[stylesGeneral.blueButton, {marginVertical: 20, marginBottom: 40}]}
              onPress={() => navigation.navigate('WorkRules')}>
              {/*onPress={() =>AsyncStorage.clear()}>*/}
              Далее
            </Text>
          </View>
        </View>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: '4.5%',
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wrapperVideo: {
    marginTop: '9%',
    marginBottom: '2%',
    position: 'relative'
  },
});

export default SchemeOfWorkScreen;
