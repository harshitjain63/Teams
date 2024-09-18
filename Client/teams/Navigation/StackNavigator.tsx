import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Testing from '../Screens/testing';
import Home from '../Components/Home';
import TeamsSplashscreen from '../Screens/TeamsSplashscreen';

export type RootStackParams = {
  Home: undefined;
  testing: undefined;
  Splash: undefined;
};

const stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={TeamsSplashscreen}
        />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen
          options={{headerShown: false}}
          name="testing"
          component={Testing}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
