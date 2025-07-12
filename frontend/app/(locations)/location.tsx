import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, DataTable, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useSelector } from 'react-redux';
import LocalizationContext from '../../contexts/LocalizationContext';
import { Locale } from '../../i18n';
import { locationsSelector } from '../../store/locations/locationsSlice';

const Locations = () => {
  const router = useRouter();
  const { t, locale, setLocale } = useContext(LocalizationContext);

  const locations = useSelector(locationsSelector);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleOpen = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenItems((prev) => [...prev, id]);
    }
  };

  const isInOpen = (name: number) => {
    return openItems.includes(name);
  };

  const navToMachine = (id: number) => {
    router.navigate(`/machine/${id}`);
  };

  const changeLanguage = () => {
    if (locale === Locale.Et) {
      setLocale(Locale.En);
    } else {
      setLocale(Locale.Et);
    }
  };

  return (
    <View style={styles.locationsContainer}>
      <ScrollView style={styles.drawerContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('location.name')}</DataTable.Title>
            <DataTable.Title numeric>
              {t('location.machine_count')}
            </DataTable.Title>
          </DataTable.Header>

          <Button onPress={changeLanguage}>{t('change_language')}</Button>

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
                    <Text>
                      {t('location.floor_no', { count: floor.floorNr })}
                    </Text>

                    {floor.machines.map((machine) => (
                      <TouchableOpacity
                        onPress={() => navToMachine(machine.id)}
                      >
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
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default Locations;

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    drawerContainer: {
      width: '100%',
      minHeight: '100%',
    },

    locationsContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: colors.background,
      height: '100%',
    },

    machineItemStyles: {
      marginVertical: 2,
      marginHorizontal: 10,
      paddingLeft: 20,
      backgroundColor: colors.primaryContainer,
    },

    customButtonStyles: {
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: colors.primary,
      color: 'white',
    },

    lightText: {
      fontWeight: '500',
      letterSpacing: 2,
      color: 'white',
    },

    floorContainer: {
      margin: 20,
    },
  });
