import React, {useEffect} from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {createLoginTable} from './Components/database/DatabaseLogin';
import {createRegisterTable} from './Components/database/DatabaseRegister';
import {createProfileTable} from './Components/database/DatabaseProfile';

const App = () => {
  useEffect(() => {
    createLoginTable();
    createRegisterTable();
    createProfileTable();
  }, []);
  return <StackNavigator />;
};

export default App;
