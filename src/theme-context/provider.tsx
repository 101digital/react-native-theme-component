import { defaultFont } from '../fonts';
import { defaultsDeep, isEmpty } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import {
  defaultTheme,
  ThemeContext,
  ThemeContextData,
  ThemeProps,
  useThemeContextValue,
} from './context';
import { defaultColors } from '../colors';

export type BankingProviderProps = {
  children: ReactNode;
  theme: ThemeProps;
  i18n?: any;
};

export const createThemeData = (theme: ThemeProps): ThemeContextData => {
  let _fonts = theme.fonts;
  if (isEmpty(_fonts)) {
    _fonts = defaultFont;
  }
  let _colors = theme.colors;
  if (isEmpty(_colors)) {
    _colors = defaultColors;
  }
  return defaultsDeep(theme, defaultTheme(_fonts, _colors));
};

export const ThemeProvider = (props: BankingProviderProps) => {
  const { children, theme, i18n } = props;
  const themeContextData = useThemeContextValue(theme, i18n);

  return <ThemeContext.Provider value={themeContextData}>{children}</ThemeContext.Provider>;
};

export const useThemeColors = () => useContext(ThemeContext).colors;
export const useThemeFonts = () => useContext(ThemeContext).fonts;
