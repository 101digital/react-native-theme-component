import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import useMergeStyles from './theme';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export type OTPFieldProps = {
  style?: OTPFieldStyles;
  cellCount: number;
  maskSymbol?: string;
  onChanged: (value: string) => void;
};

export type OTPFieldStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  focusCellContainerStyle?: StyleProp<ViewStyle>;
  cellContainerStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
};

const OTPField = ({ style, onChanged, maskSymbol, cellCount }: OTPFieldProps) => {
  const styles: OTPFieldStyles = useMergeStyles(style);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    onChanged(value);
  }, [value]);

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      keyboardType='number-pad'
      textContentType='oneTimeCode'
      rootStyle={styles.containerStyle}
      renderCell={({ index, symbol, isFocused }) => {
        let textChild = null;
        if (symbol) {
          textChild = maskSymbol ?? '•';
        } else if (isFocused) {
          textChild = <Cursor />;
        }
        const fontSize = isFocused ? 30 : 44;
        const isFilled = index < value.length;
        return (
          <View
            style={[
              styles.cellContainerStyle,
              (isFocused || isFilled) && styles.focusCellContainerStyle,
            ]}
          >
            <Text
              style={[styles.cellTextStyle, { fontSize }]}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {textChild}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default OTPField;
