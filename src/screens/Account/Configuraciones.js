import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";
import { BuscarPasajeroC } from "../../api/pasajero";
import { useFocusEffect } from "@react-navigation/native";
import StatusBar from "../../components/Search/StatusBar";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import Menu from "../../components/Account/Menu";
import colors from "../../style/colors";
import ScreenLoading from "../ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";

export default function Configuraciones() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        BuscarPasajeroC(auth.idUser).then((response) => {
          try {
            setUser(response.pasajero[0]);
          } catch (error) {
            Toast.show("Error de Conexión", {
              position: Toast.positions.CENTER,
            });
          }
        });
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
