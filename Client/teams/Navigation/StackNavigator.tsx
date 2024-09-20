import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TeamsSplashscreen from '../Screens/TeamsSplashscreen';
import Register from '../Screens/Register';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import MeetingScreen from '../Screens/MeetingScreen';
import CustomModal from '../Components/MeetingScreen/Modal';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import ChatScreen from '../Screens/ChatScreen';
import Profile from '../Screens/Profile';
import testing from '../Screens/Testing';

export type RootStackParams = {
  Home: undefined;
  Splash: undefined;
  MeetingScreen:
    | undefined
    | {
        reciever_Id: string;
      };
  Register: undefined;
  Login: undefined;
  Chat: undefined;
  Search_Modal: undefined;
  Profile: undefined;
  Testing: undefined;
};

const stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#4c2fdc'},
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
          }}>
          <stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={TeamsSplashscreen}
          />
          <stack.Screen
            options={{headerShown: false}}
            name="Testing"
            component={testing}
          />

          <stack.Screen
            options={{headerShown: true, headerBackVisible: true}}
            name="Profile"
            component={Profile}
          />
          <stack.Screen
            options={{headerShown: false}}
            name="Chat"
            component={ChatScreen}
          />
          <stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />
          <stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Meetings',

              headerBackVisible: false,
            }}
          />
          <stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
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
      </Provider>
    </NavigationContainer>
  );
};

export default StackNavigator;
