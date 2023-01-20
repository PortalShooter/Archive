import React from 'react';
import {StyleSheet, SafeAreaView, Platform, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const Header = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#58D181', '#05B9F0']}
      style={[
        styles.linearGradient,
        Platform.OS === 'ios' && windowHeight < 800 && {paddingTop: '17%'},
      ]}>
      <SafeAreaView style={{height: '100%', backgroundColor: '#fff'}}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: '22.8%',
  },
});
export default Header;
