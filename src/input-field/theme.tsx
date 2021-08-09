import { Platform, StyleSheet } from 'react-native';
import { InputFieldStyles } from '.';

const defaultInputFieldTheme: InputFieldStyles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
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
    fontFamily: 'Poppins-Regular',
  },
  errorTextStyle: {
    fontSize: 12,
    color: 'red',
    marginTop: Platform.OS === 'ios' ? 5 : 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default defaultInputFieldTheme;
