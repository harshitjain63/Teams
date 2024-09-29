import React, {useEffect} from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {createLoginTable} from './Components/database/DatabaseLogin';
import {createRegisterTable} from './Components/database/DatabaseRegister';
import {createProfileTable} from './Components/database/DatabaseProfile';
import {setupI18n} from './Components/reacti18/i18n';
import {useAppSelector} from './redux/hooks/customHook';
import {setupRegisterI18n} from './Components/reacti18/register/i18n';
import {setupProfileI18n} from './Components/reacti18/profile/i18n';

const App = () => {
  const selectedLanguage = useAppSelector(
    state => state.language.selectedLanguage,
  );

  useEffect(() => {
    createLoginTable();
    createRegisterTable();
    createProfileTable();
  }, []);

  useEffect(() => {
    const initializeI18n = async () => {
      await setupI18n(selectedLanguage);
    };

    initializeI18n();
  }, [selectedLanguage]);

  useEffect(() => {
    const initializeI18n = async () => {
      await setupRegisterI18n(selectedLanguage);
    };

    initializeI18n();
  }, [selectedLanguage]);

  useEffect(() => {
    const initializeTranslations = async () => {
      await setupProfileI18n(selectedLanguage);
    };
    initializeTranslations();
  }, [selectedLanguage]);

  return <StackNavigator />;
};

export default App;
