import React, {useEffect} from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {createTable} from './Components/database/Database';

const App = () => {
  useEffect(() => {
    createTable();
  }, []);
  return <StackNavigator />;
};

export default App;
