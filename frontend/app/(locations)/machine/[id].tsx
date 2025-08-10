import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useDispatch, useSelector } from 'react-redux';
import LocalizationContext from '../../../contexts/LocalizationContext';
import {
  machineLoadingSelector,
  machineSelector,
} from '../../../store/machine/machineSlice';
import { fetchMachineById } from '../../../store/machine/machineThunks';
import { AppDispatch, RootState } from '../../../store/store';

const Machine = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useLocalSearchParams();
  const { t } = useContext(LocalizationContext);
  const { colors } = useTheme();

  const styles = makeStyles(colors);

  const navigation = useNavigation();

  const machine = useSelector((state: RootState) => machineSelector(state));
  const machineLoading: boolean = useSelector(machineLoadingSelector);

  useEffect(() => {
    dispatch(fetchMachineById(id as string));
  }, [id]);

  useEffect(() => {
    if (machine?.name) {
      navigation.setParams({ machineName: machine.name } as any);
    }
  }, [machine]);

  // TODO : Responsive
  // TODO : Add mainenance table
  // TODO : Maybe move all to pages?
  return (
    <ScrollView style={styles.machineContainer}>
      {machineLoading || !machine ? (
        <ScrollView>
          <ActivityIndicator animating={true} color={colors.primary} />
        </ScrollView>
      ) : (
        <Card mode="contained" style={styles.cardContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.columnOne}>
              {machine?.image && (
                <Image
                  source={{ uri: machine.image }}
                  style={{ width: 100, height: 100 }}
                />
              )}
              {/* {machine.image && <Card.Cover source={{ uri: machine.image }} />} */}
            </View>

            <View style={styles.columnThree}>
              <Card.Title
                title={t('machine.machine_name', { name: machine.name })}
                subtitle={`${t('machine.machine_address', {
                  address: machine.address,
                  floor: machine.floor,
                })}`}
              />
              <Card.Content>
                {/* <Text variant="titleLarge"></Text> */}
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>

              {/* <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions> */}
            </View>
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

export default Machine;

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    columnOne: {
      flex: 1,
    },
    columnThree: {
      flex: 3,
    },
    flexContainer: {
      flex: 4,
      flexDirection: 'row',
    },
    machineContainer: {
      marginHorizontal: 20,
      marginVertical: 20,
    },

    cardContainer: {
      backgroundColor: colors.surface,

      paddingHorizontal: 20,
      paddingVertical: 20,
      display: 'flex',
    },
  });
