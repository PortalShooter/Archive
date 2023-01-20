import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from 'react-native-render-html';
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { downloadDocument } from "../redux/auth-reducer";


const StrategicObjective = ({route}) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { text, id } = route.params

  return (
    <Header>
      <SafeAreaView>
        <ScrollView style={styles.wrapper}>

          <TouchableNativeFeedback
            onPress={() => {
              dispatch(downloadDocument(id))
            }}>

            <View style={[styles.wrapperDownload]}>
              <Text style={[styles.textDownload]}>Скачать</Text>
            </View>

          </TouchableNativeFeedback>

          <RenderHtml
            contentWidth={width}
            source={{html: `${text}`}}
            baseStyle={{fontSize: 16, textAlign: 'justify'}}
          />
        </ScrollView>
      </SafeAreaView>
    </Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    height: '100%',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  bold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },

  wrapperDownload: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 29,
  },
  textDownload: {
    marginLeft: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#58D181',
  },
});

export default StrategicObjective;
