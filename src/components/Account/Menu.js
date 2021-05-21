import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Deseas salir de tu cuenta?",
      [{ text: "NO" }, { text: "SI", onPress: logout }],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        <List.Item
          title="Cambiar Datos"
          description="Cambia datos del usuario"
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() => navigation.navigate("CambiarDatos")}
        />
        <List.Item
          title="Bloquear/Desbloquear Tarjeta Actual"
          description="Bloquear/Desbloquear tarjeta para impedir el uso indebido"
          left={(props) => <List.Icon {...props} icon="lock" />}
          onPress={() => navigation.navigate("BloquearTarjeta")}
        />
        <List.Item
          title="Cambiar Tarjeta"
          description="Cambia de tarjeta"
          left={(props) => <List.Icon {...props} icon="credit-card" />}
          onPress={() => navigation.navigate("ChangeTarjeta")}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="Contacto"
          description="Soporte y sugerencias"
          left={(props) => <List.Icon {...props} icon="phone" />}
          onPress={() => navigation.navigate("Contactos")}
        />

        <List.Item
          title="Cerrar sesión"
          description="Cierra esta sesion"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutAccount}
        />

      </List.Section>
    </>
  );
}
