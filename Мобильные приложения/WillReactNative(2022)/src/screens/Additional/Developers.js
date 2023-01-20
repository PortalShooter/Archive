import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import Header from '../../components/Header';
import AdditionalNavigation from './AdditionalNavigation';
import { HelperFunctions } from "../../components/HelperFunctions";

const Developers = ({navigation}) => {

  const windowWidth = Dimensions.get('window').width;


  return (
    <Header>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <TouchableNativeFeedback
            onPress={() => {
              HelperFunctions.openURLButton('https://agency.sector.business/');
            }}>
            <View>
              <View style={{width: windowWidth, height: 200, paddingHorizontal: 25}}>
                <Image style={{resizeMode: 'contain', width: '100%', height: '100%'}} source={require('../../assets/logoSB.png')} />
              </View>

            </View>
          </TouchableNativeFeedback>

          <Text style={styles.text}>Разработано компанией</Text>
          <Text style={styles.text}>«Сектор Бизнеса»</Text>
          <Text style={[styles.text, {marginTop: 20}]}>Версия 1.1.0</Text>

        </View>
        <AdditionalNavigation navigation={navigation} />
      </SafeAreaView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
  }
});

export default Developers;
