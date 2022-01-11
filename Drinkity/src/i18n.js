import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

// the translations
const resources = {
  sk: {
    translation: {
      //main page
      'Tired of drinking just a water? Find inspiration online!': 'Si unavený stále piť len vodu? Inšpiruj sa zaujímavy nápojmi online!',
      'Find inspiration online': 'Inšpiruj sa online',

      //add drink
      'Water': 'Voda',
      'Own': 'Vlastné',
      'Add Custom Drink': 'Pridať vlastný nápoj',

      //custom drink
      'Your Drink': 'Tvôj nápoj',
      'Image': 'Obrázok',
      'Amounth': 'Množstvo',
      'Insert the drink amounth': 'Množstvo tekutín v nápoji',
      'Take Picture': 'Odfotiť',
      'Load from Gallery': 'Vybrať z Galérie',
      'Add Drink': 'Pridať nápoj',

      //First login
      'WELCOME TO DRINKITY': 'VITAJ V DRINKITY',
      'Before, I can calculate the suggested daily intake of water, I need you to answer the following questions': 'Skôr ako ti vypočítam odporúčaný denný príjem tekutín, potrebujem aby si zodpovedal nasledujúce otázky.',
      'Send': 'Odošli',

      //Settings
      'SETTINGS': 'NASTAVENIA',
      'Here you can change your age and weight to recalculate your daily suggested intake of water': 'Tu si môžeš zmeniť svôj vek a váhu aby si si nanovo vypočítal odporúčaný denný príjem tekutín',
      'Change Data': 'Zmeniť údaje',

      //First login + settings
      'What\'s your age?': 'Koľko máš rokov?',
      'Insert your age': 'Napíš svoj vek',
      'What\'s your weight?': 'Koľko vážíš?',
      'Insert your weigth': 'Napíš svoju váhu',
    }
  }
};

RNLocalize.addEventListener('change', function(){
  const language = RNLocalize.getLocales()[0].languageCode
  i18n.changeLanguage(language)
})

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode,
    compatibilityJSON: 'v3',

    keySeparator: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
