import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LocalizationContext from '../../../contexts/LocalizationContext';
import { machineSelector } from '../../../store/locations/locationsSlice';
import { RootState } from '../../../store/store';

const Machine = () => {
  const { id } = useLocalSearchParams();
  const { t, locale } = useContext(LocalizationContext);

  const navigation = useNavigation();

  const machine = useSelector((state: RootState) =>
    machineSelector(state, Number(id)),
  );

  useEffect(() => {
    if (machine?.name) {
      navigation.setParams({ machineName: machine.name } as any);
    }
  }, [machine]);

  return (
    <ScrollView>
      <Text>{id}</Text>
      {machine && (
        <Text>{t('machine.machine_name', { name: machine.name })}</Text>
      )}
      <Divider></Divider>
    </ScrollView>
  );
};

export default Machine;
