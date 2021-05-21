import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Pagos from '../screens/Pagos/Pagos';
import colors from '../style/colors';

const Stack = createStackNavigator();

export default function PagosStack() {
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
                component={Pagos}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
