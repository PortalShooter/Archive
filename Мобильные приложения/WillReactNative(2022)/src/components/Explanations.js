import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const Explanations = ({color, modalOpen, colorBgC}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        modalOpen(true);
      }}>
      <View style={[styles.wrapper, {backgroundColor: colorBgC}]}>
        <Svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <G clip-path="url(#clip0_1514_3)">
            <Path
              d="M12.3594 0.0273438H1.64062C0.735931 0.0273438 0 0.763275 0 1.66797V9.89844C0 10.8031 0.735931 11.5391 1.64062 11.5391H5.06543L7.00363 14.0173L8.9099 11.5391H12.3594C13.2641 11.5391 14 10.8031 14 9.89844V1.66797C14 0.763275 13.2641 0.0273438 12.3594 0.0273438ZM12.9062 9.89844C12.9062 10.2 12.6609 10.4453 12.3594 10.4453H8.37135L6.99637 12.2327L5.59863 10.4453H1.64062C1.3391 10.4453 1.09375 10.2 1.09375 9.89844V1.66797C1.09375 1.36644 1.3391 1.12109 1.64062 1.12109H12.3594C12.6609 1.12109 12.9062 1.36644 12.9062 1.66797V9.89844ZM6.42642 3.08984C6.42642 2.71227 6.73244 2.40625 7.11002 2.40625C7.48749 2.40625 7.79361 2.71227 7.79361 3.08984C7.79361 3.46742 7.48749 3.77344 7.11002 3.77344C6.73244 3.77344 6.42642 3.46742 6.42642 3.08984ZM7.85396 7.93962L8.33354 8.92261L7.96194 9.10387C7.77673 9.19434 7.57774 9.23888 7.37971 9.23888C7.10233 9.23888 6.82707 9.1515 6.59444 8.98039C6.19582 8.68719 5.99458 8.2012 6.06924 7.71211C6.07181 7.69502 6.07523 7.67804 6.0795 7.66127L6.51358 5.93456C6.52255 5.82529 6.45932 5.76088 6.41927 5.7314C6.37697 5.70032 6.28938 5.65599 6.17947 5.70972C5.80756 5.89119 5.73097 5.92847 5.73097 5.92847L5.25203 4.94516C5.25224 4.94505 5.32915 4.90756 5.69978 4.72673C6.14465 4.50969 6.66856 4.55711 7.06729 4.85031C7.46591 5.1434 7.66714 5.62939 7.59259 6.11848C7.58992 6.13557 7.5865 6.15256 7.58234 6.16933L7.14825 7.89604C7.13928 8.00531 7.20251 8.06972 7.24246 8.0992C7.28487 8.13039 7.37234 8.17461 7.48236 8.12088L7.85396 7.93962Z"
              fill={color}
            />
          </G>
          <Defs>
            <ClipPath id="clip0_1514_3">
              <Rect width="14" height="14" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
        <Text style={[styles.text, {color: color}]}>Пояснения</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    marginLeft: 15,
    fontFamily: 'Nunito-SemiBold',
  },
});

export default Explanations;
