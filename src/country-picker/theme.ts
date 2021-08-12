import { Dimensions, Platform, StyleSheet } from 'react-native';
import { CountryPickerStyles } from '.';
import { ThemeFontProps } from '../fonts';

const defaultCountryPickerTheme = (fonts: ThemeFontProps): CountryPickerStyles => {
  function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 780 ||
        dimen.width === 780 ||
        dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 844 ||
        dimen.width === 844 ||
        dimen.height === 896 ||
        dimen.width === 896 ||
        dimen.height === 926 ||
        dimen.width === 926)
    );
  }

  return StyleSheet.create({
    headerTextStyle: {
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 65,
      fontFamily: fonts.medium,
    },
    searchContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    searchInput: {
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      fontFamily: fonts.regular,
    },
    listContentContainerStyle: {
      marginHorizontal: 20,
    },
    topSpacer: {
      height: isIphoneX() ? 80 : 50,
      width: '100%',
    },
    containerStyle: {
      flex: 1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: 'white',
      paddingBottom: 10,
      overflow: 'hidden',
    },
    flagContainerStyle: {
      width: 48,
      height: 34,
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 3,
      backgroundColor: 'white',
      transform: [
        {
          translateX: 1,
        },
      ],
      borderColor: 'transparent',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    countryNameTextStyle: {
      flex: 1,
      marginHorizontal: 15,
      fontFamily: fonts.regular,
    },
    countryCodeTextStyle: {
      fontFamily: fonts.regular,
    },
  });
};

export default defaultCountryPickerTheme;
