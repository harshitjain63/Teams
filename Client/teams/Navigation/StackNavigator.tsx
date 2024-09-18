import React, {Dispatch, SetStateAction} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screens/Home';
import MeetingScreen from '../Screens/MeetingScreen';
import CustomModal from '../Components/MeetingScreen/Modal';
import {StatusBar} from 'react-native';

export type RootStackParams = {
  Home: undefined;
  MeetingScreen: undefined;
  Search_Modal: {
    setReciever_Id: Dispatch<SetStateAction<string>>;
  };
};

const stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#4c2fdc'},
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}>
        <stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Meetings',

            headerBackVisible: false,
          }}
        />
        <stack.Screen
          name="MeetingScreen"
          component={MeetingScreen}
          options={{
            title: 'New Meeting',
          }}
        />
        <stack.Screen
          name="Search_Modal"
          component={CustomModal}
          options={{
            presentation: 'containedTransparentModal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
