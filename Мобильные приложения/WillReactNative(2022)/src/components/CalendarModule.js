import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CalendarModule = ({
  dateValue,
  setDateValue,
  dateEndValue,
  component,
  setDateEndValue,
  windowValue,
}) => {
  const minChangeDate = new Date().toISOString().slice(0, 10);
  const changeDateHandler = day => {
    if (component === 'DateStart') {
      const monday = new Date(day.dateString);
      const dayWeek = new Date(day.timestamp).getDay();
      const differenceDay = dayWeek === 0 ? dayWeek + 6 : dayWeek - 1;

      monday.setDate(new Date(day.dateString).getDate() - differenceDay);
      if (monday > new Date(minChangeDate)) {
        setDateValue(monday.toISOString().slice(0, 10));
        const dateEnd = new Date(monday);
        dateEnd.setDate(new Date(monday).getDate() + windowValue * 7 - 1);
        setDateEndValue(dateEnd);
      }
    } else if (component === 'DayBook') {
    }
  };

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

  const [period, setPeriod] = useState({});
  useEffect(() => {
    let obj = {};
    const periodDay = Math.ceil(
      (new Date(dateEndValue) - new Date(dateValue)) / (1000 * 3600 * 24),
    );
    for (let i = 0; i <= periodDay; i++) {
      const day = new Date(dateValue);
      day.setDate(new Date(dateValue).getDate() + i);
      const data = day.toISOString().slice(0, 10);
      if (i === 0 || i % 7 === 0) {
        obj[data] = {
          disabled: true,
          startingDay: true,
          color: '#58D181',
          textColor: '#000',
        };
      } else if ((i + 1) % 7 === 0) {
        obj[data] = {
          disabled: true,
          color: '#58D181',
          endingDay: true,
          textColor: '#000',
        };
      } else {
        obj[data] = {
          disabled: true,
          color: '#58D181',
          textColor: '#000',
        };
      }
    }
    setPeriod(obj);
  }, [dateEndValue]);

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
        textSectionTitleDisabledColor: 'red',
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
      markingType={'period'}
      markedDates={period}
      firstDay={1}
      horizontal={true}
      pagingEnabled={true}
      calendarWidth={320}
    />
  );
};

export default CalendarModule;
