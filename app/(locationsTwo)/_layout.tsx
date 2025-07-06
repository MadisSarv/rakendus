import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { machineSelector } from '../../store/locations/locationsSlice';
import { RootState } from '../../store/store';

const LocationsLayout = () => {
  const { id } = useLocalSearchParams();
  const machine = useSelector((state: RootState) =>
    machineSelector(state, Number(id)),
  );

  useEffect(() => {
    console.log('SIIN ID MUUTUS', id);
  }, [id]);

  console.log('SIIN parentis', id);
  return (
    <View style={{ flex: 1 }}>
      <Stack
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        <Stack.Screen name="locationTwo" options={{ title: 'Asukohad2' }} />

        <Stack.Screen
          name="machineTwo/[id]"
          options={({ route }: any) => ({
            title: route.params?.machineName ?? 'Machine',
          })}
        />
      </Stack>
    </View>
  );
};

export default LocationsLayout;
