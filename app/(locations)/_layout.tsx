import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { View } from 'react-native';
import LocalizationContext from '../../contexts/LocalizationContext';

const LocationsLayout = () => {
  const { id } = useLocalSearchParams();

  const { t } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1 }}>
      <Stack
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        <Stack.Screen name="location" options={{ title: t('locations') }} />

        <Stack.Screen
          name="machine/[id]"
          options={({ route }: any) => ({
            title: route.params?.machineName ?? t('machine.machine'),
          })}
        />
      </Stack>
    </View>
  );
};

export default LocationsLayout;
