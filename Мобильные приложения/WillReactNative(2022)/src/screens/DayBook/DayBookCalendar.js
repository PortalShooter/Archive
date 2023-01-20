import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const DayBookCalendar = ({data}) => {
  // const date = data.data ? data.data : [];
  const note = data.notes ? data.notes : [];

  const changeDateHandler = day => {
    data.setDateItem(day.dateString);
    data.navigation.navigate('Дневник');
  };
  // const dateArr = {}
  // for (const [key, value] of Object.entries(data)) {
  //
  // }

  const result = note.reduce((acc, item) => {
    acc[item.day] = {
      customStyles: {text: {color: '#58D181', fontWeight: 'bold'}},
    };
    acc[data.dateItem] = {
      selected: true,
      customStyles: {container: {backgroundColor: '#58D181', paddingTop: 3, top: -3}},
    };
    return acc;
  }, {});

  LocaleConfig.locales.fr = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'fr';

  return (
    <Calendar
      style={{
        height: 360,
      }}
      onDayPress={day => {
        changeDateHandler(day);
      }}
      theme={{
        calendarBackground: '#ffffff',
        dayTextColor: '#000',
        textSectionTitleColor: '#05B9F0',
        arrowColor: '#05B9F0',
        textSectionTitleDisabledColor: '#d9e1e8',
        textDayFontSize: 13,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 12,
        textDayFontFamily: 'Nunito-Light',
        textMonthFontFamily: 'Nunito-Bold',
        textDayHeaderFontFamily: 'Nunito-SemiBold',
        'stylesheet.calendar.header': {
          dayTextAtIndex6: {
            color: '#58D181',
          },
        },
      }}
      markingType={'custom'}
      markedDates={result}
      firstDay={1}
      horizontal={true}
      // Enable paging on horizontal, default = false
      pagingEnabled={true}
      calendarWidth={320}
    />
  );
};

export default DayBookCalendar;
