import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import { BuscarPasajeroC } from "../../api/pasajero"
import { CobroMesesApp } from "../../api/pagos";
import PagosFiltrados from "./PagosFiltrados";


export default function ListPagos(props) {
    const { FechaI, FechaF } = props;
    const { auth } = useAuth();
    const [pagos, setPagos] = useState(null);

    const FechaInicio = () => {
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if (month < 10) {
            month = "0" + month
        }
        return year + '-' + month + '-01';
    }

    const FechaFin = () => {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if (month < 10) {
            month = "0" + month
        }
        if (day < 10) {
            day = "0" + day
        }
        return year + '-' + month + '-' + day;
    }

    useEffect(() => {
        (async () => {
            await BuscarPasajeroC(auth.idUser).then((response) => {
                try {
                    if (FechaI && FechaF) {
                        CobroMesesApp(FechaI, FechaF, response.pasajero[0].id_tarjeta_pasajero.codigo).then((response) => {
                            try {
                                setPagos(response.cobro);
                            } catch (error) {
                                console.log(error)
                                Toast.show("Error de Conexión", {
                                    position: Toast.positions.CENTER,
                                });
                            }
                        });
                    } else {
                        CobroMesesApp(FechaInicio(), FechaFin(), response.pasajero[0].id_tarjeta_pasajero.codigo).then((response) => {
                            try {
                                setPagos(response.cobro);
                            } catch (error) {
                                console.log(error)
                                Toast.show("Error de Conexión", {
                                    position: Toast.positions.CENTER,
                                });
                            }
                        });
                    }

                } catch (error) {
                    Toast.show("Error de Conexión", {
                        position: Toast.positions.CENTER,
                    });
                }
            });
        })();
    }, [FechaI, FechaF]);

    return (
        <View style={styles.container}>
            {pagos && <PagosFiltrados pagos={pagos} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 10,
    },
});