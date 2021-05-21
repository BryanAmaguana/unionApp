import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Recargas from '../screens/Recargas/Recargas';
import colors from '../style/colors';

const Stack = createStackNavigator();

export default function RecargasStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {
                    backgroundColor: "#fff",
                },
            }}>
            <Stack.Screen
                name="Recargas"
                component={Recargas}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
