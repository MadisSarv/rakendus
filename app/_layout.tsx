import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '../assets/theme';

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
    <ThemeProvider value={Theme as any}>
      <PaperProvider
        theme={Theme}
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
                name="(locationsTwo)" // This is the name of the page and must match the url from root
                options={{
                  drawerLabel: 'Asukohad2',
                  title: 'Asukohad2',
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
