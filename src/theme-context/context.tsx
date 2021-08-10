import React from 'react';
import { useMemo, useState } from 'react';
import { AlertModalStyles } from '../alert';
import defaultAlertTheme from '../alert/theme';
import { BottomSheetModalStyles } from '../bottom-sheet';
import defaultBottomSheetTheme from '../bottom-sheet/theme';
import { ButtonStyles } from '../button';
import defaultButtonTheme from '../button/theme';
import { defaultColors, ThemeColorProps } from '../colors';
import { defaultFont, ThemeFontProps } from '../fonts';
import { InputFieldStyles } from '../input-field';
import defaultInputFieldTheme from '../input-field/theme';
import { InputPhoneNumberStyles } from '../input-phone-number';
import defaultInputPhoneNumberTheme from '../input-phone-number/theme';

export const defaultTheme = (fonts: ThemeFontProps): ThemeProps => {
  return {
    colors: defaultColors,
    button: defaultButtonTheme(fonts),
    alert: defaultAlertTheme(fonts),
    fonts: defaultFont,
    bottomSheet: defaultBottomSheetTheme,
    inputField: defaultInputFieldTheme(fonts),
    inputPhoneNumber: defaultInputPhoneNumberTheme(fonts),
  };
};

export type ThemeProps = {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
  inputPhoneNumber: InputPhoneNumberStyles;
};

export interface ThemeContextData {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
  inputPhoneNumber: InputPhoneNumberStyles;
}

export const themeDefaultValue: ThemeContextData = {
  colors: {},
  button: {},
  fonts: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
  inputPhoneNumber: {},
};

export const ThemeContext = React.createContext<ThemeContextData>(themeDefaultValue);

export const useThemeContextValue = (initial: ThemeProps): ThemeContextData => {
  const [colors] = useState<ThemeColorProps>(initial.colors ?? {});
  const [fonts] = useState<ThemeFontProps>(initial.fonts ?? {});
  const [button] = useState<ButtonStyles>(initial.button ?? {});
  const [alert] = useState<AlertModalStyles>(initial.alert ?? {});
  const [bottomSheet] = useState<BottomSheetModalStyles>(initial.bottomSheet ?? {});
  const [inputField] = useState<InputFieldStyles>(initial.inputField ?? {});
  const [inputPhoneNumber] = useState<InputPhoneNumberStyles>(initial.inputPhoneNumber ?? {});

  return useMemo(
    () => ({
      colors,
      fonts,
      button,
      alert,
      bottomSheet,
      inputField,
      inputPhoneNumber,
    }),
    [colors, fonts, button, alert, bottomSheet, inputField, inputPhoneNumber]
  );
};
