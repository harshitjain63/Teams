
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Testing from '../Screens/testing';
import Home from '../Components/Home';


export type RootStackParams = {
    Home:undefined,
    testing:undefined,
}

const stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator>

                <stack.Screen name="Home" component={Home}/>
                <stack.Screen name="testing" component={Testing}/>

            </stack.Navigator>
        </NavigationContainer>

    );
};

export default StackNavigator;
