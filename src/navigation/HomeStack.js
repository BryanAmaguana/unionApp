import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import home from '../screens/Home/Home';
import colors from '../style/colors';

const Stack = createStackNavigator();

export default function HomeStack() {
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
                component={home}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}