import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import StatusBar from "../../components/Search/StatusBar"
import colors from "../../style/colors";
import { ScrollView } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTimePickerModal as DateTimePickerModal2 } from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import ListPagos from "../../components/Pagos/ListPagos";
import ScreenLoading from "../ScreenLoading";
import useAuth from "../../hooks/useAuth";
import { BuscarPasajeroC } from "../../api/pasajero";

export default function Pagos() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [MensajeFecha1, setMensajeFecha1] = useState("Fecha Inicio");
  const [MensajeFecha2, setMensajeFecha2] = useState("Fecha Fin");
  const [FechaI, setFecha1] = useState(false);
  const [FechaF, setFecha2] = useState(false);
  const [Pasajero, setPasajero] = useState(false);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        BuscarPasajeroC(auth.idUser).then((response) => {
          if (response != "Network request failed") {
            setPasajero(true);
          } else {
            setPasajero(false);
          }
        }).catch(err => {
          setPasajero(false);
        });
      })();
    }, [])
  );


  function FechaInicio(dateString) {
    var day = dateString.getDate();
    var month = dateString.getMonth() + 1;
    var year = dateString.getFullYear();
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    setFecha1(year + "-" + month + "-" + day);
  };

  function FechaFin(dateString) {
    var day = dateString.getDate();
    var month = dateString.getMonth() + 1;
    var year = dateString.getFullYear();
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    setFecha2(year + "-" + month + "-" + day)
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm1 = (date1) => {
    setFecha1(date1);
    var day1 = date1.getDate();
    var month1 = date1.getMonth() + 1;
    var year1 = date1.getFullYear();
    setMensajeFecha1(day1 + "/" + month1 + "/" + year1);
    FechaInicio(date1);
    hideDatePicker1();
  };


  /* fin de la busqueda */

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const ObtenerFecha2 = (date2) => {
    setFecha2(date2);
    var day2 = date2.getDate();
    var month2 = date2.getMonth() + 1;
    var year2 = date2.getFullYear();
    setMensajeFecha2(day2 + "/" + month2 + "/" + year2);
    FechaFin(date2)
    hideDatePicker2();
  };


  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!Pasajero ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <View style={styles.container}>
            <Button
              mode="contained"
              onPress={showDatePicker1}
              style={styles.containerProduct}
            >
              {MensajeFecha1}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
            <Button
              mode="contained"
              onPress={showDatePicker2}
              style={styles.containerProduct}
            >
              {MensajeFecha2}
            </Button>
            <DateTimePickerModal2
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={ObtenerFecha2}
              onCancel={hideDatePicker2}
            />
          </View>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>Pagos</Text>


          <ScrollView>
            <ListPagos FechaI={FechaI} FechaF={FechaF} />
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: -3,
  },
  containerProduct: {
    width: "50%",
    padding: 10,
    backgroundColor: "#e84749",
  },
  title: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 22,

  },
});
