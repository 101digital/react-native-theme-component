import { defaultFont } from '../fonts';
import { Platform, StyleSheet } from 'react-native';
import { InputPhoneNumberStyles } from '.';

const defaultInputPhoneNumberTheme: InputPhoneNumberStyles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  inputContainerStyle: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: defaultFont.regular,
  },
  errorTextStyle: {
    fontSize: 12,
    color: 'red',
    marginTop: Platform.OS === 'ios' ? 5 : 10,
    fontFamily: defaultFont.regular,
  },
  dialContainerStyle: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    padding: 0,
  },
  dialTextStyle: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
  },
});

export default defaultInputPhoneNumberTheme;
