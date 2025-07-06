import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { machineSelector } from '../../../store/locations/locationsSlice';
import { RootState } from '../../../store/store';

const Machine = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const machine = useSelector((state: RootState) =>
    machineSelector(state, Number(id)),
  );

  useEffect(() => {
    if (machine?.name) {
      navigation.setParams({ machineName: machine.name } as any);
      console.log('SIIN SETIN');
    }
  }, [machine]);

  console.log('SIIN', machine, id);
  return (
    <View>
      <Text>Masin {id}</Text>
      {machine && <Text>Masina nimi {machine.name}</Text>}
    </View>
  );
};

export default Machine;
