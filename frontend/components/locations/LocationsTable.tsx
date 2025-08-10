import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useSelector } from 'react-redux';
import LocalizationContext from '../../contexts/LocalizationContext';
import {
  Location,
  locationsSelector,
} from '../../store/locations/locationsSlice';

const LocationsTable = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const { t } = useContext(LocalizationContext);

  const locations: Location[] = useSelector(locationsSelector);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const styles = makeStyles(colors);

  const toggleOpen = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenItems((prev) => [...prev, id]);
    }
  };

  const isInOpen = (name: number) => openItems.includes(name);

  const navToMachine = (id: number) => router.navigate(`/machine/${id}`);

  return (
    <>
      {locations.map((item) => (
        <>
          <TouchableOpacity onPress={() => toggleOpen(item.id)}>
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.noOfMachines}</DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>

          {isInOpen(item.id) &&
            item.floors?.map((floor) => (
              <View style={styles.floorContainer}>
                <Text>{t('location.floor_no', { count: floor.floorNr })}</Text>

                {floor.machines.map((machine) => (
                  <TouchableOpacity onPress={() => navToMachine(machine.id)}>
                    <DataTable.Row
                      key={machine.id}
                      style={styles.machineItemStyles}
                    >
                      <DataTable.Cell>{machine.name}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Ionicons name="arrow-forward" />
                      </DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
        </>
      ))}
    </>
  );
};

export default LocationsTable;

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    machineItemStyles: {
      marginVertical: 2,
      marginHorizontal: 10,
      paddingLeft: 20,
      backgroundColor: colors.primaryContainer,
    },

    floorContainer: {
      margin: 20,
    },
  });
