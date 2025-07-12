import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { Provider } from 'react-redux';

import * as Font from 'expo-font';
import { useEffect, useMemo, useState } from 'react';

import { NativeTheme, PaperTheme } from '../assets/theme';
import LocalizationContext from '../contexts/LocalizationContext';
import i18n, { Locale } from '../i18n';
import { store } from '../store/store';

// export const i18n = new I18n({
//   en: { hello: 'Hello', changeLanguage: 'Change language' },
//   et: { hello: 'Tere', changeLanguage: 'Muuda keelt' },
// });

export default function RootLayout() {
  // const locale = useSelector(localeSelector);

  const [iconsLoaded, setIconsLoaded] = useState(false);

  const [locale, setLocale] = useState(Locale.Et);
  const localizationContext = useMemo(
    () => ({
      t: (scope: any, options?: any) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );

  //getLocales()[0].languageCode!

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const loadIcons = async () => {
    await Font.loadAsync({
      MaterialDesignIcons: require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf'),
    });
    setIconsLoaded(true);
  };

  useEffect(() => {
    loadIcons();
  }, []);

  // useEffect(() => {
  //   i18n.locale = locale;
  // }, [locale]);

  if (!loaded || !iconsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={NativeTheme}>
      <PaperProvider theme={PaperTheme}>
        <Provider store={store}>
          <LocalizationContext.Provider value={localizationContext}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer>
                <Drawer.Screen
                  name="home" // This is the name of the page and must match the url from root
                  options={{
                    drawerLabel: localizationContext.t('home'),
                    title: localizationContext.t('home'),
                  }}
                />

                <Drawer.Screen
                  name="(locations)" // This is the name of the page and must match the url from root
                  options={{
                    drawerLabel: localizationContext.t('locations'),
                    title: localizationContext.t('locations'),
                  }}
                />

                <Drawer.Screen
                  name="(tabs)" // This is the name of the page and must match the url from root
                  options={{
                    drawerLabel: localizationContext.t('user_info'),
                    title: localizationContext.t('user_info'),
                  }}
                />
              </Drawer>
            </GestureHandlerRootView>
            <StatusBar style="auto" />
          </LocalizationContext.Provider>
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}
