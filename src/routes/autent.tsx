import React from "react";
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from "../screens/CadastroScreen";

const Stack = createNativeStackNavigator()

export default function AutentRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Welcome" component= {WelcomeScreen}/>
            <Stack.Screen name= "Login" component={LoginScreen}/>
        </Stack.Navigator>
    )
}