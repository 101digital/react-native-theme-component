import { Platform, StyleSheet } from 'react-native';
import { InputFieldStyles } from '.';

const defaultInputFieldTheme: InputFieldStyles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  inputContainerStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  errorTextStyle: {
    fontSize: 12,
    color: 'red',
    marginTop: Platform.OS === 'ios' ? 5 : 10,
  },
});

export default defaultInputFieldTheme;
