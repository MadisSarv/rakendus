import { DefaultTheme } from '@react-navigation/native';
import { MD3LightTheme } from 'react-native-paper';

const customColors = { primary: '#A4DD71', primaryContainer: '#EBECF1' };

export const NativeTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...customColors,
  },
};

export const PaperTheme = {
  ...MD3LightTheme,
  dark: false,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    ...DefaultTheme.colors,
    ...customColors,
  },
};
