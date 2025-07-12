import { I18n } from 'i18n-js';
import en from './assets/translations/lang_EN.json';
import et from './assets/translations/lang_ET.json';

export enum Locale {
  Et = 'et',
  En = 'en',
}

export const i18n = new I18n({
  en: en,
  et: et,
});

i18n.locale = Locale.Et;

export default i18n;
