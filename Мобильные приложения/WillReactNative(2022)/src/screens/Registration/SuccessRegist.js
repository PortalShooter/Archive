import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView, StatusBar, Dimensions,
} from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../../components/Header';
import stylesGeneral from './../../assets/stylesGeneral';
import LoaderElement from "../../components/LoaderElement";
import Orientation from "react-native-orientation";


const SuccessRegist = ({navigation}) => {
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
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
      <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
        <SafeAreaView style={styles.wrapper}>
          <View>
            <Text style={[styles.text, styles.textBlue]}>
              Объединение саморазвития
            </Text>
            <Text style={[styles.text, styles.textBold]}>Поздравляем!</Text>
            <Text style={[styles.text, styles.textBold, {marginBottom: 20}]}>
              Вы - в пространстве саморазвития
            </Text>
            <Text style={[styles.text, styles.textDesc]}>
              В 2014 мы – студенты-психологи создали его для собственного развития
              и продвинули себя!
            </Text>
            <Text style={styles.text}>Знаем, что делаем!</Text>
            <Text style={[styles.text, styles.textBlue]}>Присоединяйтесь!</Text>
            <SafeAreaView>
              <View style={{position: 'relative'}}>
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
          <View style={{paddingHorizontal: 20}}>
            <Text
              style={[stylesGeneral.blueButton, {marginVertical: 20}]}
              onPress={() => navigation.navigate('CodeActivate')}>
              Далее
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: '1%',
    height: '100%',
    justifyContent: 'space-between',
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
  textBlue: {
    paddingHorizontal: '15%',
    marginTop: '9%',
    marginBottom: '9%',
    color: '#05B9F0',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Nunito-Bold',
  },
  textDesc: {
    paddingHorizontal: '10%',
  },
});

export default SuccessRegist;
