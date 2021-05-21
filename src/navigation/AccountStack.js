import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Configuraciones from '../screens/Account/Configuraciones';
import ChangeName from "../screens/Account/ChangeName"
import colors from '../style/colors';
import ChangeTarjeta from '../screens/Account/ChangeTarjeta';
import BloquearTarjeta from "../screens/Account/BloquearTarjeta";
import Contactos from "../screens/Contactos/Contactos"

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {
                    backgroundColor: colors.bgLight,
                },
            }}>
            <Stack.Screen
                name="Configuraciones"
                component={Configuraciones}
                options={{ title: "Cuenta", headerShown: false }}
            />
            <Stack.Screen
                name="CambiarDatos"
                component={ChangeName}
                options={{ title: "Cambiar datos del usuario" }}
            />
            <Stack.Screen
                name="BloquearTarjeta"
                component={BloquearTarjeta}
                options={{ title: "Bloquear Tarjeta" }}
            />
            <Stack.Screen
                name="ChangeTarjeta"
                component={ChangeTarjeta}
                options={{ title: "Cambiar de tarjeta" }}
            />
            <Stack.Screen
                name="Contactos"
                component={Contactos}
                options={{ title: "Soporte y Contactos" }}
            />


        </Stack.Navigator>
    )
}
