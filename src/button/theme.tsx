import { StyleSheet } from 'react-native';
import { ButtonStyles } from '.';

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
  },
  secondaryLabelStyle: {
    fontSize: 14,
    color: '#0073F0',
    letterSpacing: 1.1,
  },
  loadingWrapperStyle: {
    marginHorizontal: 5,
  },
});

export default defaultButtonTheme;
