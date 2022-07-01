import { SearchInputStyles } from './index';
import { ThemeContext } from '../theme-context/context';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';

const useMergeStyles = (style?: SearchInputStyles): SearchInputStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: SearchInputStyles = StyleSheet.create({
    containerStyle: {
      marginVertical: 10,
    },
    textInputStyle: {
      fontSize: 16,
      color: 'black',
      fontFamily: fonts.regular,
      borderRadius: 5,
      paddingRight: 15,
      paddingLeft: 45,
      backgroundColor: colors.backgroundSearchInput,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    errorTextStyle: {
      fontSize: 12,
      color: 'red',
      marginTop: Platform.OS === 'ios' ? 5 : 10,
      fontFamily: fonts.regular,
    },
    searchIconWrapper: {
      position: 'absolute',
      left: 10,
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    activeInputBorderColor: { borderColor: colors.primaryColor },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
