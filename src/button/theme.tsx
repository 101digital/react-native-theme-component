import { StyleSheet } from 'react-native';
import { ButtonStyles } from '.';
import { defaultFont } from '../fonts';

const defaultButtonTheme: ButtonStyles = StyleSheet.create({
  primaryContainerStyle: {
    height: 42,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0073F0',
  },
  secondaryContainerStyle: {
    height: 42,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  primaryLabelStyle: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 1.1,
    fontFamily: defaultFont.medium,
  },
  secondaryLabelStyle: {
    fontSize: 14,
    color: '#0073F0',
    letterSpacing: 1.1,
    fontFamily: defaultFont.medium,
  },
  loadingWrapperStyle: {
    marginHorizontal: 5,
  },
});

export default defaultButtonTheme;
