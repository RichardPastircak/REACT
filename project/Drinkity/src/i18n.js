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
      'Juice': 'Ďžús',
      'Milk': 'Mlieko',
      'Coffee': 'Káva',
      'Add Custom Drink': 'Pridať vlastný nápoj',

      //custom drink
      'Your Drink': 'Tvôj nápoj',
      'Image': 'Obrázok',
      'Amounth': 'Množstvo',
      'Drink amounth': 'Množstvo tekutín v nápoji',
      'Percentage': 'Podiel',
      'Percentage of water in drink': 'Podiel vody v nápoji',
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

      //API
      'Category of drink': 'Kategória',
      'Glass type': 'Pohár',
      'Ingredients': 'Ingrediencie',
      'BACK': 'DOZADU',
      'NONALCOHOLIC': 'NEALKOHOLICKÝ',
      'ALCOHOLIC': 'ALKOHOLICKÝ',
      'FORWARD': 'DOPREDU',

        //kategoprie
        'Cocktail' : 'Kokteil',
        'Punch / Party Drink': 'Punč / Party nápoj',
        'Other/Unknown': 'Iné/Neznáme',
        'Milk / Float / Shake': 'Mlieko/Float/Šejk',
        'Beer': 'Pivo',
        'Ordinary Drink': 'Obyčajný nápoj',

        //poháre
        'Old-fashioned glass': 'Retro pohár',
        'Beer Glass': 'Pivný pohár',
        'Beer mug': 'Hrnček na pivo',
        'White wine glass': 'Vinný pohár',
        'Shot glass': 'Štamrplík',
        'Collins glass': 'Collins pohár',
        'Collins Glass': 'Collins pohár',
        'Highball Glass': 'Highball pohár',
        'Cocktail glass': 'Kokteil pohár',
        'Cocktail Glass': 'Kokteil pohár',

        //miery
      '1/2 oz ': '15 ml',
      '1/2 oz': '15 ml',
      '1/2 oz Bacardi ': '15 ml Bacardi',
      '1.5 oz ': '15 ml',
      '1/3 oz ': '10 ml',
      '1/4 oz ': '7.5 ml',
      '1 oz ': '30 ml',
      '2 1/2 oz ': '75 ml',
      '2-3 oz': '60 - 90 ml',
      '3 oz ': '90 ml',
      '16 oz ': '480 ml',

      '1/2 shot ': '22 ml',
      '1/2 shot Bacardi ': '22 ml Bacaradi',
      '1 shot ': '44 ml',
      '2 shots ': '88 ml',

      '1 part ': '1 polievková lyžica',
      '4 parts ': '4 polievkové lyžice',

      '1 cup ': '1 šálka',
      '1 cup plain ': '1 šálka',
      '2 cups ': '2 šálky',
      '2 cups fresh ': '2 šálky čestvého',
      '3/4 cup ': '3/4 šálky',

      '1 cl ': '10 ml',
      '2 cl ': '20 ml',
      '3 cl ': '30 ml',
      '4 cl ': '40 ml',
      '6 cl ': '60 ml',
      '10 cl ': '100 ml',

      '1-2 dash ': '1-2 ml',
      '1 wedge ': '40 ml',
      '1 splash ': '1 čajová lyžička',
      '1 large ': '1 veľká',
      '2 tsp ': '2 čajový lyžičky',
      '1/2 lb frozen ': '0.25 kg mrazených',

      'Juice of 1/2 ': 'Šťava z 1/2',
      '1 frozen ': '1 mrazený',
      'Fill with ': 'Doplnte s',
      ' to taste\n': 'dochutiť',
      'of': '',
    }
  },
  en: {
    ' to taste\n': 'to taste',
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
