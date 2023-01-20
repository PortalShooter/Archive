import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const TimePickerItem = ({setViewableItems, type, hours, minutes}) => {
  let data = {
    hour: [
      {id: 0, value: '00'},
      {id: 1, value: '01'},
      {id: 2, value: '02'},
      {id: 3, value: '03'},
      {id: 4, value: '04'},
      {id: 5, value: '05'},
      {id: 6, value: '06'},
      {id: 7, value: '07'},
      {id: 8, value: '08'},
      {id: 9, value: '09'},
      {id: 10, value: '10'},
      {id: 11, value: '11'},
      {id: 12, value: '12'},
      {id: 13, value: '13'},
      {id: 14, value: '14'},
      {id: 15, value: '15'},
      {id: 16, value: '16'},
      {id: 17, value: '17'},
      {id: 18, value: '18'},
      {id: 19, value: '19'},
      {id: 20, value: '20'},
      {id: 21, value: '21'},
      {id: 22, value: '22'},
      {id: 23, value: '23'},
    ],
    cutHour: [
      {id: 1, value: '04'},
      {id: 2, value: '05'},
      {id: 3, value: '06'},
      {id: 4, value: '07'},
      {id: 5, value: '08'},
      {id: 6, value: '09'},
      {id: 7, value: '10'},
      {id: 8, value: '11'},
      {id: 9, value: '12'},
      {id: 10, value: '13'},
      {id: 11, value: '14'},
      {id: 12, value: '15'},
      {id: 13, value: '16'},
      {id: 14, value: '17'},
      {id: 15, value: '18'},
      {id: 16, value: '19'},
      {id: 17, value: '20'},
      {id: 18, value: '21'},
      {id: 19, value: '22'},
      {id: 20, value: '23'},
    ],
    minutes: [
      {id: 0, value: '00'},
      {id: 1, value: '05'},
      {id: 2, value: '10'},
      {id: 3, value: '15'},
      {id: 4, value: '20'},
      {id: 5, value: '25'},
      {id: 6, value: '30'},
      {id: 7, value: '35'},
      {id: 8, value: '40'},
      {id: 9, value: '45'},
      {id: 10, value: '50'},
      {id: 11, value: '55'},
    ],
  };

  // const onViewRef = React.useRef(viewableItems => {
  //
  //    if (viewableItems.viewableItems[1].item.value) {
  //       if (viewableItems.viewableItems[1].item.value > viewableItems.viewableItems[0].item.value) {
  //         setViewableItems(viewableItems.viewableItems[0].item.value);
  //       } else {
  //         setViewableItems(viewableItems.viewableItems[1].item.value);
  //       }
  //     } else if (viewableItems.viewableItems[1].item.value === null || undefined) {
  //      setViewableItems(viewableItems.viewableItems[0].item.value)
  //    }
  // });

  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems.viewableItems[1]) {
      // let qwe = viewableItems.viewableItems[1].item.value > viewableItems.viewableItems[0].item.value? viewableItems.viewableItems[1].item.value : viewableItems.viewableItems[0].item.value
      setViewableItems(viewableItems.viewableItems[1].item.value);
    } else if (viewableItems.viewableItems[1] === undefined || null) {
      setViewableItems(viewableItems.viewableItems[0].item.value);
    }
  });
  const viewConfigRef = {viewAreaCoveragePercentThreshold: 100};

  const renderItem = ({item, index}) => {
    return (
      <Text key={index} style={styles.item}>
        {item.value}
      </Text>
    );
  };

  const min = minutes ? data.minutes.map(el => el.value).indexOf(minutes) : 0;
  const finalData = () => {
    if (type === 'hour') {
      return data.hour;
    } else if (type === 'cutHour') {
      return data.cutHour;
    } else if (type === 'minutes') {
      return data.minutes;
    }
  };
  const initialIndex = () => {
    if (type === 'hour') {
      return hours;
    } else if (type === 'cutHour') {
      return data.cutHour.map(el => el.value).indexOf(hours);
    } else if (type === 'minutes') {
      return min;
    }
  };

  return (
    <View style={{width: 120, height: 90.3, marginVertical: 68}}>
      <FlatList
        data={finalData()}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        initialScrollIndex={initialIndex()}
        pagingEnabled={true}
        getItemLayout={(data, index) => ({
          length: 90.8,
          offset: 90.8 * index,
          index,
        })}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    paddingHorizontal: 20,
    display: 'flex',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    height: 332,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  item: {
    fontSize: 48,
    width: '100%',
    height: 90.3,
    color: 'rgba(5, 185, 240, 1)',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
  },
  title: {
    fontSize: 32,
  },
  remindLater: {
    color: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
});

export default TimePickerItem;
