import React, {Component} from 'react';

import {
  View,
  FlatList,
  UIManager,
  ScrollView,
  StyleSheet,
  PanResponder,
  findNodeHandle,
  Text,
  Modal,
  Platform,
} from 'react-native';

import {Helper} from './Helper';

import {Day} from './Day';
import stylesGeneral from '../../assets/stylesGeneral';
import {minute} from '../../assets/data/valuePicker';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {month} from '../../assets/data/date';
import {Picker} from '@react-native-picker/picker';

export class DraggableCalendar extends Component {
  constructor(props) {
    super(props);

    const {initialSelectedRange = []} = props;
    this.state = {
      showModal: false,
      showModalDay: false,
      modalHour: '08',
      startDate: initialSelectedRange[0],
      endDate: initialSelectedRange[1],
      calendarData: {
        arr: [],
      },
      minuteIOS: '00',
    };

    let hour = 4;
    let yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);

    const dataNow = new Date();
    dataNow.setHours(3, 0, 0, 0);

    // const dayOfWeek = 7 - new Date().getDay();

    const firstDay = new Date(props.daysOfWeek[0].day);
    firstDay.setHours(3, 0, 0, 0);

    function checkStatus(i, datHour) {
      const nextData = props.daysOfWeek[(i + 8) % 7];
      const prevData = props.daysOfWeek[(i + 6) % 7];
      // const prevDataDay = new Date(prevData.day)
      // prevDataDay.setHours(0, 0, 0, 0);

      let nextDay = false;
      let prevDay = false;

      if (
        nextData.planned_start_time &&
        nextData.planned_start_time.slice(0, 2) === datHour
      ) {
        nextDay = true;
      }
      if (
        prevData.planned_start_time &&
        prevData.planned_start_time.slice(0, 2) === datHour
      ) {
        if (prevData.start_time &&  (new Date(prevData.day).setHours(3, 0, 0, 0) < dataNow)) {
          prevDay = true;
        } else if (!prevData.start_time && (new Date(prevData.day).setHours(3, 0, 0, 0) >= dataNow)) {
          prevDay = true;
        }
      }
      if (prevDay && nextDay) {
        return 3;
      } else if (prevDay && !nextDay) {
        return 4;
      } else if (!prevDay && nextDay) {
        return 2;
      } else {
        return 1;
      }
    }

    for (let i = 0; i < 140; i++) {
      let dataMinutes = '00';
      let available = true;
      let status = 0;
      let data;
      let lock = true;

      data = props.daysOfWeek[(i + 7) % 7];
      const dataDay = new Date(data.day);
      dataDay.setHours(0, 0, 0, 0);
      if (new Date(props.daysOfWeek[0].day) <= dataNow) {
        lock = !data.planned_start_time;
      }
      if (i > 6) {
        hour = 3 + Math.ceil((i + 1) / 7);
      }

      if ((i + 1) % 7 === 0) {
        lock = false;
      }

      if (dataNow >= firstDay) {
        lock = false;
      }

      if (data.planned_start_time) {
        const datHourStr = data.planned_start_time.slice(0, 2);
        const datHourNum = datHourStr[0] === '0' ? +datHourStr[1] : +datHourStr;

        if (datHourNum === hour) {
          dataMinutes = data.planned_start_time.slice(3, 5);
          status = checkStatus(i, datHourStr);

          if (data.start_time === null) {
            if (dataDay < yesterday) {
              status = 6;
            }
          } else if (data.start_time) {
            if (data.completion_rate) {
              if (dataDay <= dataNow) {
                const startTimeHourStr = data.start_time.slice(0, 2);
                const startTimeHourNumber =
                  startTimeHourStr[0] === '0'
                    ? +startTimeHourStr[1]
                    : +startTimeHourStr;
                if (datHourNum === startTimeHourNumber) {
                  status = 5;
                  if ((i + 1) % 7 === 0) {
                    status = 7;
                  }
                } else {
                  status = 1;
                  dataMinutes = data.planned_start_time.slice(3, 5);
                }
              }
            } else {
              status = 6;
            }
          }
          available = false;
        }
        if (data.start_time && data.completion_rate) {
          const startTimeHourStr = data.start_time.slice(0, 2);
          const startTimeHourNumber =
            startTimeHourStr[0] === '0'
              ? +startTimeHourStr[1]
              : +startTimeHourStr;
          if (hour === startTimeHourNumber && !(datHourNum === hour)) {
            status = 7;
            dataMinutes = data.start_time.slice(3, 5);
            available = false;
          }
        }
      }
      // if (!props.internet) {
      //   lock = false;
      // }
      this.state.calendarData.arr.push({
        date: `${i}`,
        status: status,
        available: available,
        hour: hour,
        minutes: dataMinutes,
        data: data,
        lock: lock,
      });
    }
    // Создаются пропсы
    this._scrollY = 0;
    this._monthRefs = [];
    this._dayLayouts = {};
    this._touchPoint = {};
    this._panResponder = {};
    this._pressEnd = false;
    this._pressStart = false;
    this._dayLayoutsIndex = [];
    this.count = 7;
    this.minutes = '00';

    this.daysIds = [];
    this.plannedStartTimes = [];

    this._onScroll = this._onScroll.bind(this);
    this._onPanMove = this._onPanMove.bind(this);
    this._onPressDay = this._onPressDay.bind(this);
    this._onPanGrant = this._onPanGrant.bind(this);
    this._onPanRelease = this._onPanRelease.bind(this);
    this._onShowModal = this._onShowModal.bind(this);
  }

  componentWillMount() {
    this._initPanResponder();
    this._updateDayStatus(this.props.initialSelectedRange);
  }

  componentDidMount() {
    Helper.waitFor(0).then(() => this._genLayouts());
  }

  // componentDidUpdate() {
  //   console.log(this.state.calendarData.arr);
  // }

  //При каждом изменении вызывается эта функция
  resetSelection(selectionRange = []) {
    if (Helper.isEmptyArray(selectionRange)) {
      return;
    }

    // обновляет состояние и выполняет повторную визуализацию календаря
    this._updateDayStatus(selectionRange);
    this.setState({startDate: selectionRange[0], endDate: selectionRange[1]});
  }

  _initPanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this._onPanGrant,
      onPanResponderMove: this._onPanMove,
      onPanResponderRelease: this._onPanRelease,
    });
  }

  _getRefLayout(ref) {
    return new Promise(resolve => {
      UIManager.measureLayout(
        findNodeHandle(ref),
        findNodeHandle(this._sv),
        () => {},
        (x, y, width, height, pageX, pageY) => {
          resolve({x, y, width, height, pageX, pageY});
        },
      );
    });
  }
  _genDayLayout(identifier, layout) {
    // layout выдает координаты для каждого блока месяца

    // по идентификатору найти данные месяца из calendarData
    const monthData = this.state.calendarData[identifier];
    // extract info from layout, and calculate the width and height for each day item
    const {x, y, width} = layout;
    const ITEM_WIDTH = width / 7;

    // calculate the layout for each day item
    const dayLayouts = {};
    monthData.forEach((data, index) => {
      if (data.date) {
        dayLayouts[data.date] = {
          x: x + (index % 7) * ITEM_WIDTH,
          y: y + parseInt(index / 7) * 51,
          width: ITEM_WIDTH,
          height: 51,
        };
      }
    });

    // сохраните dayLayouts в this._layouts.days
    Object.assign(this._dayLayouts, dayLayouts);

    // создать индекс для макетов дней, чтобы ускорить преобразование (x, y) на сегодняшний день
    this._dayLayoutsIndex.push(
      Helper.buildIndexItem({
        left: x,
        right: x + width,
        dayLayouts: Object.keys(dayLayouts).map(key => dayLayouts[key]),
      }),
    );
  }

  _genLayouts() {
    // после рендеринга scrollView и месяцев генерирует параметры макета для каждого элемента дня.
    Promise.all(this._monthRefs.map(ref => this._getRefLayout(ref))).then(
      monthLayouts => {
        // according to the month's layout, generates each day's layout
        monthLayouts.forEach((monthLayout, index) => {
          this._genDayLayout(
            Object.keys(this.state.calendarData).sort()[index],
            monthLayout,
          );
        });
        this.forceUpdate();
      },
    );
  }

  _genDraggableAreaStyle(date) {
    if (date) {
      const {x, y, width, height} = this._dayLayouts[date];
      return {left: x, top: y - this._scrollY, width, height};
    } else {
      return null;
    }
  }
  // Обновляет статус дня - то есть меняет стили
  _updateDayStatus(selectionRange = []) {
    if (Helper.isEmptyArray(selectionRange)) {
      return;
    }
    // const [startDate, endDate] = selectionRange;
    const {calendarData} = this.state;
    Object.keys(calendarData).forEach(key => {
      // каждый key это месяц, который рендерится
      // установить флаг: если статус изменился, значит, этот месяц нужно перерисовать.
      let hasChanged = false;
      calendarData[key].forEach((dayData, index) => {
        if (dayData.date && dayData.available) {
          const newDayStatus = Helper.getDayStatus(
            dayData,
            selectionRange,
            calendarData[key],
            index,
          );
          if (dayData.status !== newDayStatus) {
            hasChanged = true;
            dayData.status = newDayStatus;
          }
        }
      });
      if (hasChanged) {
        calendarData[key] = Object.assign([], calendarData[key]);
      }
    });

    this.setState({calendarData});
  }

  _updateSelection() {
    const {x, dx, y} = this._touchPoint;
    const touchingDate = +Helper.positionToDate(
      {x: x + dx, y: y},
      this._dayLayoutsIndex,
    );

    if (!this.state.calendarData.arr[touchingDate].lock) {
      return;
    }
    if (!this.state.calendarData.arr[touchingDate].available) {
      this.state.calendarData.arr[touchingDate].available = true;
    }
    // генерирует новый диапазон даты выбора
    let newSelection = [],
      {startDate, endDate} = this.state;
    if (
      this.state.calendarData.arr[startDate] &&
      this.state.calendarData.arr[endDate]
    ) {
      if (this._pressStart && touchingDate !== startDate) {
        if (touchingDate <= endDate) {
          newSelection = [touchingDate, endDate];
        } else {
          this._pressStart = false;
          this._pressEnd = true;
          newSelection = [endDate, touchingDate];
        }
      } else if (this._pressEnd && touchingDate !== endDate) {
        if (touchingDate >= startDate) {
          newSelection = [startDate, touchingDate];
        } else {
          this._pressStart = true;
          this._pressEnd = false;
          newSelection = [touchingDate, startDate];
        }
      }
    }
    // если выбор dateRange (диапазон дат) изменяется, обновите его
    if (newSelection.length > 0) {
      this.resetSelection(newSelection);
    }
  }

  _onScroll(e) {
    this._scrollY = Helper.getValue(
      e,
      'nativeEvent:contentOffset:y',
      this._scrollY,
    );
  }

  // вызывается при сингл выборе дня и вызывает перерендр
  _onPressDay(date, lock, data) {
    let yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    if (
      (!lock && new Date(data.day) < yesterday && data.planned_start_time) ||
      data.start_time
    ) {
      this.setState({
        showModalDay: {
          plannedStartTime: data.planned_start_time,
          startTime: data.start_time,
          data: data.day,
        },
      });
    }
    if (date && lock) {
      this.resetSelection([date, date]);
    }
  }

  _onPanGrant(evt) {
    //сохранить исходное положение
    const {locationX, locationY} = evt.nativeEvent;
    this._touchPoint.x = locationX;
    this._touchPoint.y = locationY;
  }

  // вызывается именно при клике на элеменет( сингл, начало или конец )
  _onTouchStart(type, date) {
    const pressMap = {start: '_pressStart', end: '_pressEnd'};
    this[pressMap[type]] = true;
    if (this._pressStart || this._pressEnd) {
      const dateStr = date;

      this._touchPoint.x += Helper.getValue(
        this,
        `_dayLayouts:${dateStr}:x`,
        0,
      );
      this._touchPoint.y += Helper.getValue(
        this,
        `_dayLayouts:${dateStr}:y`,
        0,
      );
    }
  }

  _onPanMove(evt, gesture) {
    const {dx, dy, numberActiveTouches} = gesture;
    if (numberActiveTouches < 2) {
      this._touchPoint.dx = dx;
      this._touchPoint.dy = dy;
      this._updateSelection();
    }
  }

  _onPanRelease() {
    this._touchPoint = {};
    this._pressStart = false;
    this._pressEnd = false;
  }

  _onShowModal(state) {
    this.setState({
      showModal: state,
    });
  }

  _renderBody() {
    const {calendarData} = this.state;
    return (
      <View>
        <ScrollView
          ref={_ => (this._sv = _)}
          scrollEventThrottle={1}
          scrollEnabled={false}
          nestedScrollEnabled={false}
          onScroll={this._onScroll}>
          {Object.keys(calendarData).map((key, index) =>
            this._renderMonth({
              data: calendarData[key],
              index,
            }),
          )}
        </ScrollView>
        {this._renderDraggableArea()}
        {this.state.showModal && this._timeModal()}
        {this.state.showModalDay && this._ModalDay(this.state.showModalDay)}
      </View>
    );
  }

  _renderMonth({data, index}) {
    return [this._renderMonthBody({data, index})];
  }

  _renderMonthBody({data, index}) {
    return (
      <FlatList
        ref={_ => (this._monthRefs[index] = _)}
        data={data}
        numColumns={7}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        renderItem={({item}) => {
          let time;
          let hour = item.hour;
          let nextHour = hour + 1;
          if (nextHour < 10) {
            nextHour = '0' + nextHour;
          }
          if (hour < 10) {
            hour = '0' + hour;
          }
          if (item.status !== 0) {
            time = hour + ':' + item.minutes;
          } else if (item.date % 7 === 0) {
            time = hour + '-' + nextHour;
          }
          return (
            <Day
              data={item}
              bodyTime={time}
              status={item.status}
              onPress={this._onPressDay}
            />
          );
        }}
      />
    );
  }

  _ModalDay(data) {
    const dataDay = new Date(data.data);
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        statusBarTranslucent={true}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.34)',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 26,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingTop: 29,
              paddingBottom: 30,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'Nunito-Bold',
                marginBottom: 31,
              }}>
              {dataDay.getDate()} {month[dataDay.getMonth()]}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 13,
              }}>
              <Text style={{fontSize: 12, fontFamily: 'Nunito-Light'}}>
                Фактическое время начала дела:
              </Text>
              <Text
                style={{
                  color: '#58D181',
                  fontSize: 12,
                  fontFamily: 'Nunito-Bold',
                }}>
                {data.startTime ? data.startTime.slice(0, 5) : '-- : --'}
              </Text>
            </View>

            {dataDay.getDay() !== 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <Text style={{fontSize: 12, fontFamily: 'Nunito-Light'}}>
                  Запланированное время начала дела:
                </Text>
                <Text
                  style={{
                    color: '#58D181',
                    fontSize: 12,
                    fontFamily: 'Nunito-Bold',
                  }}>
                  {data.plannedStartTime.slice(0, 5)}
                </Text>
              </View>
            )}

            <Text
              style={[stylesGeneral.blueButton, {marginTop: 20}]}
              onPress={() => {
                this.setState({
                  showModalDay: false,
                });
              }}>
              Закрыть
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  _timeModal() {
    this.minutes = '00';
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        statusBarTranslucent={true}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.34)',
            paddingHorizontal: 20,
            display: 'flex',
          }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              height: 340,
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 5,
              paddingTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  height: 90.3,
                  marginVertical: 68,
                  fontSize: 48,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  color: 'rgba(5, 185, 240, 1)',
                  width: 120,
                  fontFamily: 'Nunito-Bold',
                }}>
                {this.state.modalHour}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 48,
                    textAlignVertical: 'center',
                    color: 'rgba(5, 185, 240, 1)',
                  },
                  Platform.OS === 'ios' && {top: 69},
                ]}>
                :
              </Text>
              <View
                style={{
                  width: 120,
                  height: '200%',
                  justifyContent: 'flex-start',
                  flex: 1,
                  top: -63,
                }}>
                {Platform.OS === 'ios' ? (
                  <Picker
                    style={{flex: 1, top: 57}}
                    selectedValue={this.state.minuteIOS}
                    onValueChange={itemValue => {
                      const minuteIOS = itemValue;
                      this.setState({minuteIOS});
                      this.minutes = itemValue;
                    }}
                    itemStyle={{
                      color: '#05B9F0',
                      fontSize: 48,
                      fontFamily: 'Nunito-Bold',
                    }}>
                    {minute.map(el => {
                      return <Picker.Item label={el} value={el} />;
                    })}
                  </Picker>
                ) : (
                  <WheelPicker
                    style={{flex: 1}}
                    data={minute}
                    selectedItemTextSize={48}
                    initPosition={0}
                    itemTextSize={48}
                    selectedItemTextFontFamily={'Nunito-Bold'}
                    itemTextFontFamily={'Nunito-Bold'}
                    onItemSelected={e => (this.minutes = minute[e])}
                    isCyclic={true}
                    visibleItemCount={3}
                    hideIndicator={false}
                    itemTextColor={'#F3F3F3'}
                    selectedItemTextColor={'#05B9F0'}
                    itemStyle={{
                      color: 'rgba(5, 185, 240, 1)',
                      fontSize: 48,
                      fontFamily: 'Nunito-Bold',
                      backgroundColor: 'transparent',
                      top: 56,
                    }}
                  />
                )}
              </View>
            </View>
            <Text
              style={[stylesGeneral.blueButton, {marginTop: 15}]}
              onPress={() => {
                let {startDate, endDate} = this.state;
                for (let i = startDate; i <= endDate; i++) {
                  this.daysIds.push(this.state.calendarData.arr[i].data.id);
                  this.plannedStartTimes.push(
                    this.state.modalHour + ':' + this.minutes,
                  );

                  this.setState(prevState => {
                    let calendarData = Object.assign(
                      {},
                      prevState.calendarData,
                    );
                    calendarData.arr[i].minutes = this.minutes;
                    return calendarData;
                  });

                  const dayData = this.state.calendarData.arr[i];
                  const dayDis = dayData.date % 7;
                  this.state.calendarData.arr.forEach(item => {
                    if (
                      item.date % 7 === dayDis &&
                      item.date !== dayData.date
                    ) {
                      this.setState(prevState => {
                        let calendarData = Object.assign(
                          {},
                          prevState.calendarData,
                        );
                        if (item.status !== 0) {
                          if (endDate % 7 === dayDis) {
                            const nextDay =
                              this.state.calendarData.arr[+item.date + 1];
                            if (nextDay.status !== 0) {
                              if (
                                this.state.calendarData.arr[+item.date + 2]
                                  .status === 0
                              ) {
                                nextDay.status = 1;
                              } else {
                                nextDay.status = 2;
                              }
                            }
                          }
                          if (startDate % 7 === dayDis) {
                            const prevDay =
                              this.state.calendarData.arr[item.date - 1];
                            if (prevDay && prevDay.status !== 0) {
                              if (prevDay.date === '0') {
                                prevDay.status = 1;
                              } else if (prevDay.date > 0) {
                                if (
                                  this.state.calendarData.arr[+item.date - 2]
                                    .status === 0
                                ) {
                                  prevDay.status = 1;
                                } else {
                                  prevDay.status = 4;
                                }
                              }
                            }
                          }
                        }
                        item.status = 0;
                        item.available = true;
                        return calendarData;
                      });
                    }
                  });
                }
                this._onShowModal(false);

                this.daysIds.forEach((el, index) => {
                  const coin = this.props.DataDaysTime[0].indexOf(el);
                  if (coin >= 0) {
                    this.props.DataDaysTime[0].splice(coin, 1, el);
                    this.props.DataDaysTime[1].splice(
                      coin,
                      1,
                      this.plannedStartTimes[index],
                    );
                    this.props.setDataDaysTime([
                      this.props.DataDaysTime[0],
                      this.props.DataDaysTime[1],
                    ]);
                  } else {
                    this.props.setDataDaysTime([
                      this.props.DataDaysTime[0].concat(this.daysIds),
                      this.props.DataDaysTime[1].concat(this.plannedStartTimes),
                    ]);
                  }
                });
                this.daysIds = [];
                this.plannedStartTimes = [];
                const minuteIOS = '00';
                this.setState({minuteIOS});
              }}>
              Сохранить
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  _renderDraggableArea() {
    let {startDate, endDate} = this.state;
    return [
      //Этот блок кода позволяет удлинять ползунок с начала и с конца
      // По факту это только начало клика, здесь я не увидел самого движения удлинения
      <View
        {...this._panResponder.panHandlers}
        onTouchStart={() => this._onTouchStart('start', startDate)}
        onTouchEnd={() => console.log('end1')}
        style={[styles.dragContainer, this._genDraggableAreaStyle(startDate)]}
      />,
      <View
        {...this._panResponder.panHandlers}
        onTouchStart={() => this._onTouchStart('end', endDate)}
        onTouchEnd={() => {
          this._updateDayStatus([this.state.startDate, this.state.endDate]);
          for (let i = startDate; i <= endDate; i++) {
            this.state.calendarData.arr[i].available = false;
          }
          this.setState({
            modalHour:
              this.state.calendarData.arr[startDate].hour < 10
                ? '0' + this.state.calendarData.arr[startDate].hour
                : this.state.calendarData.arr[startDate].hour,
          });
          this._pressEnd = false;
          this._pressStart = false;
          this._onShowModal(true);
        }}
        style={[styles.dragContainer, this._genDraggableAreaStyle(endDate)]}
      />,
    ];
  }

  render() {
    const {style} = this.props;
    return <View style={style}>{this._renderBody()}</View>;
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  dragContainer: {
    zIndex: 1,
    position: 'absolute',
  },
});
export default class Draggable {}
