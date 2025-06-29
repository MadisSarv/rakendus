import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  Location,
  locationsSelector,
  Machine,
} from '../../store/locations/locationsSlice';

const makeStyles = (colors: any) =>
  StyleSheet.create({
    drawerContainer: {
      width: '100%',
    },

    locationsContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: colors.background,
      height: '100%',
    },

    drawerItem: {
      borderRadius: 0,
      borderBottomColor: 'black',
    },

    dropDownItem: {
      paddingLeft: 20,
      borderRadius: 0,
    },
  });

const Locations = () => {
  const router = useRouter();
  const locations = useSelector(locationsSelector);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleOpen = (name: number) => {
    if (openItems.includes(name)) {
      setOpenItems((prev) => prev.filter((item) => item !== name));
    } else {
      setOpenItems((prev) => [...prev, name]);
    }
  };

  const isInOpen = (name: number) => {
    return openItems.includes(name);
  };

  return (
    <View style={styles.locationsContainer}>
      <View style={styles.drawerContainer}>
        <Drawer.Section>
          <View>
            {locations &&
              locations.map((location: Location) => (
                <View>
                  <Drawer.Item
                    style={styles.drawerItem}
                    label={location.name}
                    active={isInOpen(location.id)}
                    onPress={() => toggleOpen(location.id)}
                    right={() => (
                      <Ionicons
                        name={isInOpen(location.id) ? 'arrow-up' : 'arrow-down'}
                      />
                    )}
                  />
                  {isInOpen(location.id) && (
                    <>
                      {location.machines.map((machine: Machine) => (
                        <Drawer.Item
                          style={styles.dropDownItem}
                          label={machine.name}
                          onPress={() =>
                            router.navigate(`/machine/${machine.id}`)
                          }
                        />
                      ))}
                    </>
                  )}
                </View>
              ))}
          </View>
        </Drawer.Section>
      </View>
    </View>
  );
};

export default Locations;
