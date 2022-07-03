import React, { ReactNode, useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SearchIcon } from '../assets/search.icon';
import useMergeStyles from './theme';
import { ThemeContext } from '../theme-context/context';

export type SearchInputProps = TextInputProps & {
  errorBorderColor?: string;
  activeBorderColor?: string;
  inactiveBorderColor?: string;
  placeholderTextColor?: string;

  searchIcon?: ReactNode;
  style?: SearchInputStyles;
};

export type SearchInputStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  searchIconWrapper?: StyleProp<ViewStyle>;
  activeInputBorderColor?: StyleProp<ViewStyle>;
};

const SearchInput = (props: SearchInputProps) => {
  const {
    onFocus,
    onBlur,
    onChangeText,
    searchIcon,
    placeholder,
    placeholderTextColor,
    style,
    ...restProps
  } = props;
  const [active, setActive] = useState(false);
  const [value, setValue] = useState<string>();
  const styles: SearchInputStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const onValueChange = (s: string) => {
    setValue(s);
    if (onChangeText) {
      onChangeText(s);
    }
  };

  return (
    <View style={styles.containerStyle}>
      <>
        <TextInput
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChangeText={onValueChange}
          value={value}
          placeholder={placeholder ? placeholder : 'Search'}
          style={[styles.textInputStyle, active && styles.activeInputBorderColor]}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.placeholderColor
          }
          {...restProps}
        />
        {searchIcon ? (
          searchIcon
        ) : (
          <View style={styles.searchIconWrapper}>
            <SearchIcon size={25} />
          </View>
        )}
      </>
    </View>
  );
};

export default SearchInput;
