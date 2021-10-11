import React, { useState, useContext, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
// @ts-ignore
import { Calendar, CalendarTheme, DateObject } from 'react-native-calendars';
import moment from 'moment';
import { ThemeContext } from '../theme-context';
import { defaultsDeep } from 'lodash';
import Modal from 'react-native-modal';
import XDate from 'xdate';
import { Button } from 'index';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type DateRangePickerStyles = {
  headerContainer?: StyleProp<ViewStyle>;
  calendarContainer?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  bottomContainer?: StyleProp<ViewStyle>;
};

export type DateRangePickerProps = {
  isVisible?: boolean;
  initStart?: string;
  initEnd?: string;
  backdropOpacity?: number;
  onClose: () => void;
  onChange: (startDate: string, endDate: string) => void;
  color?: {
    rangeColor?: string;
    dotColor?: string;
    selectedColor?: string;
    textColor?: string;
    selectedTextColor?: string;
  };
  maxDate?: Date;
  title?: string;
  cancelTitle?: string;
  applyTitle?: string;
  calendarTheme?: CalendarTheme;
  style?: DateRangePickerStyles;
};

const DateRangePicker = (props: DateRangePickerProps) => {
  const { fonts, colors, dateRangePicker, i18n } = useContext(ThemeContext);
  const {
    onChange,
    onClose,
    initEnd,
    initStart,
    maxDate,
    title,
    calendarTheme,
    style,
    isVisible,
    backdropOpacity,
    color,
  } = props;
  const [markedDate, setMarkedDate] = useState({});
  const [startDate, setStartDate] = useState(initStart);
  const [endDate, setEndDate] = useState(initEnd);

  const styles: DateRangePickerStyles = defaultsDeep(style, dateRangePicker);

  const calTheme = defaultsDeep(calendarTheme, {
    todayTextColor: 'black',
    indicatorColor: colors.primaryColor,
    textDayFontFamily: fonts.regular,
    textMonthFontFamily: fonts.medium,
    textDayHeaderFontFamily: fonts.medium,
    textSectionTitleColor: 'black',
    textMonthFontWeight: '600',
    textMonthFontSize: 16,
    monthTextColor: 'black',
    textDayFontWeight: '300',
    arrowColor: 'black',
    'stylesheet.calendar.main': {
      monthView: {
        borderWidth: 0,
        borderColor: '#E5E5E5',
        borderRadius: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
      },
      week: {
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 0,
      },
    },
    'stylesheet.day.period': {
      base: {
        overflow: 'hidden',
        height: 34,
        alignItems: 'center',
        width: 38,
      },
    },
  });

  const innerStyles = StyleSheet.create({
    modalStyle: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
      zIndex: 100,
    },
    container: {
      backgroundColor: 'white',
    },
  });

  useEffect(() => {
    setupInitialRange();
  }, [isVisible]);

  const getTodayColor = (isSelected: boolean) => {
    return isSelected ? color?.selectedTextColor ?? 'white' : 'grey';
  };

  const onDayPress = (day: DateObject) => {
    if (!startDate || (startDate && endDate)) {
      setupStartMarker(day);
    } else if (!endDate) {
      let markedDates = { ...markedDate };
      let [mMarkedDates, range] = setupMarkedDates(startDate, day.dateString, markedDates);
      if (range >= 0) {
        setEndDate(day.dateString);
        setMarkedDate(mMarkedDates);
      } else {
        setupStartMarker(day);
      }
    }
  };

  const setupStartMarker = (day: DateObject) => {
    let today = moment().format('YYYY-MM-DD');
    let markedDates: any = {
      [day.dateString]: {
        startingDay: true,
        endingDay: true,
        color: colors.primaryColor,
        textColor: 'white',
        marked: today === day.dateString,
        dotColor: color?.dotColor ?? 'white',
      },
    };
    setStartDate(day.dateString);
    setEndDate(undefined);
    setMarkedDate(markedDates);
  };

  const setupMarkedDates = (fromDate: string, toDate: string, markedDates: any) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let today = moment().format('YYYY-MM-DD');
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range === 0) {
        markedDates = {
          [toDate]: {
            color: colors.primaryColor,
            textColor: 'white',
            startingDay: true,
            endingDay: false,
          },
        };
      } else {
        markedDates = {
          [fromDate]: { ...markedDates[fromDate], endingDay: false },
        };
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: color?.rangeColor ?? '#E9F0FC',
              textColor: getTodayColor(tempDate === today),
              marked: tempDate === today,
              dotColor: color?.dotColor ?? 'white',
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: colors.primaryColor,
              textColor: 'white',
              marked: tempDate === today,
              dotColor: color?.dotColor ?? 'white',
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  const setupInitialRange = () => {
    if (!initEnd || !initStart) {
      return;
    }
    let markedDates = {
      [initStart]: {
        startingDay: true,
        color: colors.primaryColor,
        textColor: 'white',
        endingDay: true,
      },
    };
    let [mMarkedDates] = setupMarkedDates(initStart, initEnd, markedDates);
    setMarkedDate(mMarkedDates);
  };

  const handleApply = () => {
    if (startDate) {
      onChange(startDate, endDate || startDate);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backdropOpacity}
      statusBarTranslucent
      style={innerStyles.modalStyle}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <SafeAreaView style={innerStyles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitleStyle}>
            {title ?? i18n?.t('date_picker.lbl_select_date_range') ?? 'Select A Date Range'}
          </Text>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            markingType={'period'}
            markedDates={markedDate}
            maxDate={maxDate}
            theme={calTheme}
            onDayPress={(day) => onDayPress(day)}
          />
          <View style={styles.bottomContainer}>
            <Button label='Cancel' variant='secondary' onPress={onClose} />
            <Button label='Apply' onPress={handleApply} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

DateRangePicker.defaultProps = {
  isVisible: false,
  backdropOpacity: 0.5,
};

export default DateRangePicker;
