import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, Dimensions} from 'react-native';
import CodeEntry from './components/CodeEntry';
import Header from '../../components/Header';
import stylesGeneral from './../../assets/stylesGeneral';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkActivationCode,
  getTasksActual,
  setError,
} from '../../redux/auth-reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const marginTopBtn = Dimensions.get('window').height / 4 + 100;

const CodeActivate = ({navigation}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const phoneNumber = useSelector(state => state.Auth.phoneNumber);
  const tasksActual = useSelector(state => state.Auth.tasksActual);
  const phone = phoneNumber.replace(/[\D]+/g, '');
  const token = useSelector(state => state.Auth.user.token);
  const error = useSelector(state => state.Auth.error);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error, [
        {text: 'OK', onPress: () => dispatch(setError(''))},
      ]);
    }
  }, [error]);
  useEffect(() => {
    if (token) {
      dispatch(getTasksActual());
      if (tasksActual) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Navigation',
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'SchemeOfWorkScreen',
            },
          ],
        });
      }
    }
  }, [token]);

  return (
    <Header>
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView style={{height: '100%'}}>
          <View style={{width: windowWidth, paddingHorizontal: 42}}>
            <Text style={styles.text}>
              Введите код активации
            </Text>
            <CodeEntry keyboard={'default'} count={7} setCode={setCode} />
            <Text
              style={[stylesGeneral.blueButton, {marginTop: marginTopBtn}]}
              onPress={() => {
                if (code.length === 7) {
                  dispatch(checkActivationCode(phone, code));
                }
              }}>
              Далее
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Header>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 46,
    marginBottom: 35,
    paddingTop: '10%',
  },
});

export default CodeActivate;
