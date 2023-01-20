import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AdditionalInformation from '../../components/AdditionalInformation';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import Audio from '../../components/Audio/Audio';
import ExplainModal from '../../components/ModalWindows/ExplainModal';
import NotesItem from '../../components/Notes/NotesItem';
import AddNotes from '../../assets/img/AddNotes';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTrainingNotes,
  fetchTrainingNotes,
} from '../../redux/training-reducer';
import NotesTraining from '../../components/Notes/NotesTraining';
import Explanations from '../../components/Explanations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CountUpToThree = props => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.Training.training_notes);
  const idTraining = props.route.params.id;
  const notesLeng = notes.length ? notes.length : 0;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [notesIsOpen, setNotesIsOpen] = useState(false);

  const deleteNotesItemHandler = id => {
    dispatch(deleteTrainingNotes(idTraining, id));
  };

  useEffect(() => {
    dispatch(fetchTrainingNotes(idTraining));
  }, [dispatch]);

  return (
    <Header>
      <View style={styles.wrapper}>
        <ScrollView>
          <KeyboardAwareScrollView style={{height: '100%'}}>
            <AdditionalInformation
              text={[
                'Нужно прослушать фразу, обращенную к тебе. Досчитать «про себя» до 3х. И только после этого мысленно ответить.\n' +
                  'Ответ записывать не требуется.',
              ]}
            />
            <View style={styles.container}>
              <View style={styles.bg}>
                <Text style={styles.text}>Случайная фраза или вопрос:</Text>
                <Audio
                  navigation={props.navigation}
                  trainingName={'сountThree'}
                />
                <Explanations
                  color={'#05B9F0'}
                  modalOpen={setModalIsOpen}
                  colorBgC={'#F8F8F8'}
                />
              </View>

              {notes.length
                ? notes.map((item, index) => (
                    <NotesItem
                      key={index}
                      id={item.id}
                      text={item.note}
                      idItem={index}
                      deleteNotesItemHandler={deleteNotesItemHandler}
                    />
                  ))
                : null}

              {notesIsOpen ? (
                <NotesTraining
                  setNotesIsOpen={setNotesIsOpen}
                  notesLeng={notesLeng}
                  idTraining={idTraining}
                />
              ) : null}

              {notesIsOpen ? null : (
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor="transparent"
                  onPress={() => setNotesIsOpen(!notesIsOpen)}>
                  <View style={styles.addFlex}>
                    <AddNotes />
                    <Text style={styles.addText}>Добавить запись</Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
      {modalIsOpen ? (
        <ExplainModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          title={'Тренинг «Счет до 3х»'}
          text={
            <Text>
              Тренинг помогает лучше понимать, что происходит, и действовать
              обдуманно, «удачно». Казалось бы, посчитать до 3х - так просто.
              Это не так! {'\n'}
              Попробуй{' '}
              <Text style={{fontFamily: 'Nunito-Bold'}}>
                в реальном общении
              </Text>{' '}
              перед ответом на вопрос или приветствие досчитать «про себя» до
              3х. Сразу станет ясно, что это крайне трудно. {'\n'}
              Рекомендуем научиться такому умению с помощью тренинга. {'\n'}
              Потренируйся в приложении и пробуй применять навык в общении.{' '}
              {'\n'}
              Тут же начнет укрепляться воля. {'\n'}
              Желаем успехов! Уж мы точно знаем, что это непросто. {'\n'}
              Тем, у кого это дело никак не будет получаться, можно пробовать{' '}
              <Text style={{fontFamily: 'Nunito-Bold'}}>
                упрощенный вариант:
              </Text>{' '}
              считать не до трех, а хотя бы до одного. {'\n'}
              Важно! Главное - сначала досчитать до 3х (или до 1го), прийти в
              свое ясное состояние и постараться четко понять фразу. Ее смысл. И
              дать краткий ответ.
            </Text>
          }
        />
      ) : null}
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8F8F8',
    height: '100%',
    paddingTop: 20,
  },
  container: {
    marginTop: 25,
    marginHorizontal: 25,
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
  },
  addFlex: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  addText: {
    color: 'rgba(5, 185, 240, 1)',
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Nunito-Semibold',
  },
  bg: {
    paddingTop: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
export default CountUpToThree;
