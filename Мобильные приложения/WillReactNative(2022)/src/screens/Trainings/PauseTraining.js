import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import AdditionalInformation from '../../components/AdditionalInformation';
import Audio from '../../components/Audio/Audio';
import ExplainModal from '../../components/ModalWindows/ExplainModal';
import Explanations from '../../components/Explanations';

const PauseTraining = ({navigation}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Header>
      <View style={styles.wrapper}>
        <AdditionalInformation
          text={[
            'Слушай и проговаривай текст «про себя». Учись настраиваться на важное дело.',
          ]}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Пауза - настройка на дело</Text>
          <Audio navigation={navigation} trainingName={'Pause'} />
          <Explanations
            color={'#05B9F0'}
            modalOpen={setModalIsOpen}
            colorBgC={'#F8F8F8'}
          />
        </View>
      </View>
      {modalIsOpen ? (
        <ExplainModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          title={'Тренинг «Пауза – настройка на дело»'}
          text={
            <Text>
              Современный человек переполнен привычными желаниями, мыслями,
              действиями. И когда появляется необходимость сделать серьезное
              новое дело, нередко по привычке откладывает его, даже не осознав
              ценности дела. А серьезные дела – шансы развить себя, сделать
              сильнее. {'\n'}
              Для того, чтобы не упускать важные дела и выполнять их
              качественно, полезно научиться прерывать поток привычных дел,
              «приходить в свое ясное состояние сознания» и настраиваться на
              предстоящее серьезное действие. {'\n'}
              Это дает возможность получить больше пользы от дел. {'\n'}
              Тренинг поможет потренировать умение делать «паузы» -
              настраиваться на дела.
            </Text>
          }
        />
      ) : null}
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
  },
  text: {
    fontFamily: 'Nunito-Light',
    marginBottom: 16,
    marginLeft: 20,
  },
  explain: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginTop: 37,
    textAlign: 'center',
    color: '#B7B7B7',
    padding: 10,
  },
  container: {
    marginHorizontal: 20,
    marginTop: 35,
    backgroundColor: '#fff',
    paddingTop: 44,
    borderRadius: 5,
    paddingHorizontal: 23,
    paddingBottom: 22,
  },
});

export default PauseTraining;
