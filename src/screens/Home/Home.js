import React, { useState, useCallback } from "react";
import StatusBar from "../../components/Search/StatusBar";
import { ScrollView } from "react-native";
import colors from "../../style/colors";
import { BuscarPasajeroC } from "../../api/pasajero";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import Datos from "../../components/Home/Datos"
import ScreenLoading from "../ScreenLoading";

export default function Home() {
  const [Pasajero, setPasajero] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        BuscarPasajeroC(auth.idUser).then((response) => {
          try {
            setPasajero(response.pasajero[0]);
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
      {!Pasajero ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <ScrollView>
            <Datos Pasajero={Pasajero} />
          </ScrollView>
        </>
      )}

    </>
  );
}