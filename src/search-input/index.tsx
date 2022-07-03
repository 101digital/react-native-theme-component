import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { SearchIcon } from '../assets/search.icon';
import useMergeStyles from './theme';
import { ThemeContext } from '../theme-context/context';
import { SearchInputProps, SearchInputStyles } from './types';

const SearchInput = (props: SearchInputProps) => {
  const {
    onFocus,
    onBlur,
    onChangeText,
    searchIcon,
    placeholder,
    placeholderTextColor,
    inputStyles,
    blurOnSubmit,
    ...restProps
  } = props;
  const [active, setActive] = useState(false);
  const [value, setValue] = useState<string>();
  const styles: SearchInputStyles = useMergeStyles(inputStyles);
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
    if(onChangeText) {
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
          placeholder={placeholder}
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
