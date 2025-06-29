import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <PaperProvider
        theme={MD3LightTheme}
        settings={{
          icon: (props: any) => <Ionicons {...props} />,
        }}
      >
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
              <Drawer.Screen
                name="home" // This is the name of the page and must match the url from root
                options={{
                  drawerLabel: 'Home',
                  title: 'Home',
                }}
              />

              <Drawer.Screen
                name="(locations)" // This is the name of the page and must match the url from root
                options={{
                  drawerLabel: 'Asukohad',
                  title: 'Asukohad',
                }}
              />

              <Drawer.Screen
                name="(tabs)" // This is the name of the page and must match the url from root
                options={{
                  drawerLabel: 'Kasutaja info',
                  title: 'Kasutaja info',
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
        </Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}
