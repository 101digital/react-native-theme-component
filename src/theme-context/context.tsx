import React from 'react';
import { useMemo, useState } from 'react';
import { AlertModalStyles } from '../alert';
import defaultAlertTheme from '../alert/theme';
import { BottomSheetModalStyles } from '../bottom-sheet';
import defaultBottomSheetTheme from '../bottom-sheet/theme';
import { ButtonStyles } from '../button';
import defaultButtonTheme from '../button/theme';
import { defaultColors, ThemeColorProps } from '../colors';
import { ThemeFontProps } from '../fonts';
import { InputFieldStyles } from '../input-field';
import defaultInputFieldTheme from '../input-field/theme';

export const defaultTheme: ThemeProps = {
  colors: defaultColors,
  button: defaultButtonTheme,
  alert: defaultAlertTheme,
  fonts: {},
  bottomSheet: defaultBottomSheetTheme,
  inputField: defaultInputFieldTheme,
};

export type ThemeProps = {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
};

export interface ThemeContextData {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
}

export const themeDefaultValue: ThemeContextData = {
  colors: {},
  button: {},
  fonts: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
};

export const ThemeContext = React.createContext<ThemeContextData>(themeDefaultValue);

export const useThemeContextValue = (initial: ThemeProps): ThemeContextData => {
  const [colors] = useState<ThemeColorProps>(initial.colors ?? {});
  const [fonts] = useState<ThemeFontProps>(initial.fonts ?? {});
  const [button] = useState<ButtonStyles>(initial.button ?? {});
  const [alert] = useState<AlertModalStyles>(initial.alert ?? {});
  const [bottomSheet] = useState<BottomSheetModalStyles>(initial.bottomSheet ?? {});
  const [inputField] = useState<InputFieldStyles>(initial.inputField ?? {});

  return useMemo(
    () => ({
      colors,
      fonts,
      button,
      alert,
      bottomSheet,
      inputField,
    }),
    [colors, fonts, button, alert, bottomSheet, inputField]
  );
};
