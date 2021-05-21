import React from 'react'
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import AccountStack from './AccountStack';
import colors from "../style/colors";
import Home from "./HomeStack";
import PagosStack from "./PagosStack";
import RecargasStack from './RecargasStack';



const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routeStatus) => {
                        return setIcon(route, routeStatus);
                    },
                })}>
                <Tab.Screen
                    name="home"
                    component={Home}
                    options={{
                        title: "Inicio",
                    }}
                />
                <Tab.Screen
                    name="Historial"
                    component={PagosStack}
                    options={{
                        title: "Pagos",
                    }}
                />

                <Tab.Screen
                    name="Recargas"
                    component={RecargasStack}
                    options={{
                        title: "Recargas",
                    }}
                />

                <Tab.Screen
                    name="Configuraciones"
                    component={AccountStack}
                    options={{
                        title: "Mi Cuenta",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


function setIcon(route, routeStatus) {
    let iconName = "";
    switch (route.name) {
        case "home":
            iconName = "home";
            break;
        case "Historial":
            iconName = "bus";
            break;
        case "Recargas":
            iconName = "dollar";
            break;
        case "Configuraciones":
            iconName = "bars";
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} style={[styles.icon]} />;
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark,
    },
    icon: {
        fontSize: 20,
        color: colors.fontLight,
    },
});
