import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";

export default function UserInfo(props) {
  const { user } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido,</Text>
      <Text style={styles.titleName}>
        {user.id_persona.nombre_persona && user.id_persona.apellido_persona
          ? `${user.id_persona.nombre_persona} ${user.id_persona.apellido_persona}`
          : "Datos no encontrados"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
