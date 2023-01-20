import React, {PureComponent} from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {DAY_STATUS} from './Helper';

export class Day extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }
  _genStyle() {
    const {data} = this.props;
    const usedDayTextStyle = [styles.dayText];
    const usedDayContainerStyle = [styles.dayContainer];

    if (data.status !== DAY_STATUS.NONE) {
      const containerStyleMap = {
        1: [styles.singleDayContainer],
        2: [styles.beginDayContainer],
        3: [styles.middleDayContainer],
        4: [styles.endDayContainer],
        5: [styles.singleDayContainerSuccess],
        6: [styles.singleDayContainerGrey],
        7: [styles.singleDayContainerBlue],
      };
      usedDayTextStyle.push(styles.selectedDayText);
      usedDayContainerStyle.push(...(containerStyleMap[data.status] || []));
    }
    return {usedDayTextStyle, usedDayContainerStyle};
  }

  _onPress() {
    const {data = {}, onPress} = this.props;
    onPress && onPress(data.date, data.lock, data.data);
  }

  render() {
    let {bodyTime} = this.props;
    const {usedDayTextStyle, usedDayContainerStyle} = this._genStyle();
    return (
      <View style={styles.fullContainer}>
        <TouchableWithoutFeedback
          style={styles.fullContainer}
          onPress={this._onPress}>
          <View>
            <View style={usedDayContainerStyle}>
              <Text style={[usedDayTextStyle, {fontSize: 12}]}>{bodyTime}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    height: 40,
  },
  singleDayContainer: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFBB33',
  },
  singleDayContainerSuccess: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#58D181',
  },
  singleDayContainerBlue: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#05B9F0',
  },
  singleDayContainerGrey: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BBBBBB',
  },

  beginDayContainer: {
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFBB33',
  },
  middleDayContainer: {
    height: 40,
    backgroundColor: '#FFBB33',
  },
  endDayContainer: {
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFBB33',
  },
  dayText: {
    fontSize: 15,
    color: '#ACACAC',
    fontFamily: 'Nunito-SemiBold',
  },
  selectedDayText: {
    color: '#FFF',
  },
});
