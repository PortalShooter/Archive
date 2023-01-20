import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {G, Path, Rect, Defs, ClipPath} from 'react-native-svg';

const AdditionalInformation = props => {
  let textContent = props.text.map((text, index) => (
    <Text key={index} style={styles.text}>
      {text}
    </Text>
  ));
  return (
    <View style={styles.wrapper}>
      <Svg
        style={styles.svg}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none">
        <G clip-path="url(#clip0)">
          <Path
            d="M42.375 0.09375H5.625C2.52319 0.09375 0 2.61694 0 5.71875V33.9375C0 37.0393 2.52319 39.5625 5.625 39.5625H17.3672L24.0125 48.0593L30.5482 39.5625H42.375C45.4768 39.5625 48 37.0393 48 33.9375V5.71875C48 2.61694 45.4768 0.09375 42.375 0.09375ZM44.25 33.9375C44.25 34.9713 43.4088 35.8125 42.375 35.8125H28.7018L23.9875 41.9407L19.1953 35.8125H5.625C4.59119 35.8125 3.75 34.9713 3.75 33.9375V5.71875C3.75 4.68494 4.59119 3.84375 5.625 3.84375H42.375C43.4088 3.84375 44.25 4.68494 44.25 5.71875V33.9375ZM22.0334 10.5938C22.0334 9.29919 23.0826 8.25 24.3772 8.25C25.6714 8.25 26.7209 9.29919 26.7209 10.5938C26.7209 11.8883 25.6714 12.9375 24.3772 12.9375C23.0826 12.9375 22.0334 11.8883 22.0334 10.5938ZM26.9279 27.2216L28.5721 30.5918L27.2981 31.2133C26.6631 31.5234 25.9808 31.6761 25.3019 31.6761C24.3508 31.6761 23.4071 31.3766 22.6095 30.7899C21.2428 29.7847 20.5529 28.1184 20.8088 26.4415C20.8176 26.3829 20.8293 26.3247 20.844 26.2672L22.3323 20.347C22.363 19.9724 22.1462 19.7516 22.0089 19.6505C21.8639 19.5439 21.5636 19.392 21.1868 19.5762C19.9116 20.1984 19.649 20.3262 19.649 20.3262L18.007 16.9548C18.0077 16.9545 18.2714 16.8259 19.5421 16.2059C21.0674 15.4618 22.8636 15.6244 24.2307 16.6296C25.5974 17.6345 26.2874 19.3008 26.0317 20.9777C26.0226 21.0363 26.0109 21.0945 25.9966 21.152L24.5083 27.0721C24.4775 27.4468 24.6943 27.6676 24.8313 27.7687C24.9767 27.8756 25.2766 28.0272 25.6538 27.843L26.9279 27.2216Z"
            fill="#FFD600"
          />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="48" height="48" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
      <View style={styles.content}>{textContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  svg: {
    marginRight: 23,
  },
  text: {
    marginBottom: 15,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Nunito-Light',
  },
  content: {
    flex: 1,
  },
});

export default AdditionalInformation;
