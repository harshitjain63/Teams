import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Components/Home';
import TeamsSplashscreen from '../Screens/TeamsSplashscreen';
import Register from '../Screens/Register';
import Login from '../Screens/Login';

export type RootStackParams = {
  Home: undefined;
  Splash: undefined;
  Register: undefined;
  Login: undefined;
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
        <stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        />

        <stack.Screen name="Home" component={Home} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
