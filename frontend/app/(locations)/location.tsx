import { useContext, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Button, DataTable, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useDispatch, useSelector } from 'react-redux';
import LocationsTable from '../../components/locations/LocationsTable';
import LocalizationContext from '../../contexts/LocalizationContext';
import { Locale } from '../../i18n';
import { locationsLoadingSelector } from '../../store/locations/locationsSlice';
import { fetchLocations } from '../../store/locations/locationThunks';
import { AppDispatch } from '../../store/store';

const Locations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { t, locale, setLocale } = useContext(LocalizationContext);

  const locationsLoading: Boolean = useSelector(locationsLoadingSelector);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

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

          {locationsLoading && (
            <ActivityIndicator animating={true} color={colors.primary} />
          )}

          {!locationsLoading && <LocationsTable />}
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
  });
