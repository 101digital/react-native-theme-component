import { defaultsDeep } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import {
  defaultTheme,
  ThemeContext,
  ThemeContextData,
  ThemeProps,
  useThemeContextValue,
} from './context';

export type BankingProviderProps = {
  children: ReactNode;
  theme: ThemeProps;
};

export const createThemeData = (theme: ThemeProps): ThemeContextData => {
  return defaultsDeep(theme, defaultTheme);
};

export const ThemeProvider = (props: BankingProviderProps) => {
  const { children, theme } = props;
  const themeContextData = useThemeContextValue(theme);

  return <ThemeContext.Provider value={themeContextData}>{children}</ThemeContext.Provider>;
};

export const useThemeColors = () => useContext(ThemeContext).colors;
export const useThemeFonts = () => useContext(ThemeContext).fonts;
