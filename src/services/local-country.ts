import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryInformation } from '../country-picker/types';
const COUNTRY_KEY = 'themecomponent.countries';

class LocalCountry {
  storeCountries = (countries: CountryInformation[]) =>
    AsyncStorage.setItem(COUNTRY_KEY, JSON.stringify(countries));

  getCountries = async (): Promise<CountryInformation[]> => {
    try {
      const value = await AsyncStorage.getItem(COUNTRY_KEY);
      return value ? JSON.parse(value) : [];
    } catch (_) {
      return [];
    }
  };
}

const instance = new LocalCountry();
export default instance;
