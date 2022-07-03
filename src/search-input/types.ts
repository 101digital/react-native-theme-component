import { ReactNode } from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type SearchInputProps = 
TextInputProps & {
  errorBorderColor?: string;
  activeBorderColor?: string;
  inactiveBorderColor?: string;
  placeholderTextColor?: string;

  searchIcon?: ReactNode;
  inputStyles?: SearchInputStyles;
};

export type SearchInputStyles = {
containerStyle?: StyleProp<ViewStyle>;
inputContainerStyle?: StyleProp<ViewStyle>;
textInputStyle?: StyleProp<TextStyle>;
errorTextStyle?: StyleProp<TextStyle>;
searchIconWrapper?: StyleProp<ViewStyle>;
activeInputBorderColor?: StyleProp<ViewStyle>;
};
