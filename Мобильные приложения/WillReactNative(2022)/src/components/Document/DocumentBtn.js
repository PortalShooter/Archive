import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Arrow from '../Arrow';


const DocumentBtn = ({navigation, data}) => {

  return (
    <TouchableNativeFeedback
      onPress={() =>  navigation.navigate('DocumentDetail', {name: data.title, text: data.text, id: data.id})}
    >
      <View style={styles.linkWrapper}>
        <Image style={{width: 30, height: 30}} source={require('../../assets/documentImg.png')} />
        <Text style={styles.linkPage}>{data.title}</Text>
        <Arrow rotate={270} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    justifyContent: 'flex-start',
    width: 165,
  },
});

export default DocumentBtn;
