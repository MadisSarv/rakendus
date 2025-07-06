import { DefaultTheme, MD3LightTheme } from 'react-native-paper';

const customColors = { primary: '#A4DD71', primaryContainer: '#EBECF1' };

const Theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    ...MD3LightTheme.colors,
    ...customColors,
  },
};

export default Theme;
