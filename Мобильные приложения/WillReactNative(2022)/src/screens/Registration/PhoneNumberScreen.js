import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Header from '../../components/Header';
import stylesGeneral from './../../assets/stylesGeneral';
// import Google from '../../assets/img/Google';
// import Facebook from '../../assets/img/Facebook';
// import Vk from '../../assets/img/Vk';
// import Apple from '../../assets/img/Apple';
import TextInputMask from 'react-native-text-input-mask';
import {useDispatch} from 'react-redux';
import {checkPhone, setPhoneNumber} from '../../redux/auth-reducer';
import NetInfo from "@react-native-community/netinfo";
import Disconnect from "../../assets/img/Disconnect";

const PhoneNumberScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  const [error, setError] = useState('');
  const [valuePhone, setValuePhone] = useState('');
  const [valuePhoneSendAPI, setValuePhoneSendAPI] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setConnected(false);
      } else {
        setConnected(true);
      }
    });
    return () => {
      unsubscribe();
    };
  });

  const entryHandler = () => {
    if (valuePhoneSendAPI.length === 11 && check && !connected) {
      dispatch(setPhoneNumber(valuePhone));
      dispatch(checkPhone(valuePhoneSendAPI));
      navigation.navigate('PhoneCodeScreen');
    }
  };

  return (
    <Header>
      <View style={styles.wrapper}>
        <ScrollView>
        {(connected) ?  <View style={styles.disconnectWrapper}>
          <Disconnect />
          <Text style={styles.disconnectText}>
            Для авторизации в приложении нужен интернет
          </Text>
        </View> : <View style={styles.disconnectWrapper}/>}
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <View style={{paddingHorizontal: 8,}}>
            <Text style={styles.numberText}>Введи номер телефона</Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                setValuePhone(formatted); // +1 (123) 456-78-90
                setValuePhoneSendAPI(extracted); // 1234567890
                setError('');
              }}
              value={valuePhone}
              style={styles.input}
              placeholder={'+'}
              keyboardType={'number-pad'}
              mask={'+[0] ([000]) [000] [00] [00]'}
            />
            {/*{error? <Text>{error}</Text> : null}*/}
            <Text style={stylesGeneral.blueButton} onPress={entryHandler}>
              Вход
            </Text>
          </View>
          <View style={styles.row}>
            <BouncyCheckbox
              disableText={true}
              size={30}
              fillColor="#58D181"
              unfillColor="#FFFFFF"
              text="Custom Checkbox"
              iconStyle={{borderColor: '#58D181'}}
              onPress={() => setCheck(!check)}
              value={check}
            />
            <Text style={styles.confident}>
              Я принимаю условия <Text onPress={() => navigation.navigate('PrivacyPolicy')} style={{color: '#58D181', fontFamily: 'Nunito-Light',}}>политики конфиденциальности</Text>  и согласен на <Text onPress={() => navigation.navigate('PersonalDataProcessing')} style={{color: '#58D181', fontFamily: 'Nunito-Light',}}>обработку персональных данных</Text>

            </Text>
          </View>

          {/*<Text style={styles.text}>Или авторизуйся с помощью:</Text>*/}
          {/*<View style={styles.iconWrapper}>*/}
          {/*  <Google/>*/}
          {/*  <Facebook/>*/}
          {/*  <Vk/>*/}
          {/*  <Apple/>*/}
          {/*</View>*/}
        </ScrollView>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    height: '100%',
    paddingHorizontal: 28,
  },
  numberText: {
    marginBottom: 9,
    fontFamily: 'Nunito-Light',
  },
  input: {
    width: '100%',
    height: 42,
    marginBottom: 12,
    paddingHorizontal: 21,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    color: '#000',
    fontFamily: 'Nunito-Light',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 2,
  },
  iconWrapper: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confident: {
    marginLeft: 17,
    paddingRight: 22,
    fontFamily: 'Nunito-Regular',
  },
  text: {
    marginTop: 70,
    fontFamily: 'Nunito-Regular',
  },
  image: {
    width: 45,
    height: 45,
  },
  disconnectWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 46,
    marginVertical: 19,
    marginHorizontal: 20,
  },
  disconnectText: {
    color: "rgba(255, 68, 64, 1)",
    marginLeft: 32,
    fontFamily: "Nunito-Bold",
  },
});

export default PhoneNumberScreen;
