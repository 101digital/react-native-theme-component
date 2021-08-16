import { StyleSheet } from 'react-native';
import { ImagePickerStyles } from '.';
import { ThemeFontProps } from '../fonts';

const defaultImagePickerTheme = (fonts: ThemeFontProps): ImagePickerStyles => {
  return StyleSheet.create({
    buttonContainerStyle: {
      width: '100%',
      flexDirection: 'row',
    },
    textContainerStyle: {
      marginLeft: 15,
      flex: 1,
    },
    buttonTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      textAlign: 'left',
      color: 'black',
      lineHeight: 17,
    },
    cancelTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      textAlign: 'center',
      color: 'red',
      lineHeight: 17,
    },
  });
};

export default defaultImagePickerTheme;
