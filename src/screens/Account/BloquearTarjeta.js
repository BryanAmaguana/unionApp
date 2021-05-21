import React, { useState, useCallback } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formStyle } from "../../style"
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { BuscarPasajeroC } from "../../api/pasajero"
import { Alert } from "react-native";
import { ActivarTarjetaApp } from "../../api/tarjeta"


export default function ChangeTarjeta() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [Bloqueo, setBloqueo] = useState(false);
    const [Id, setId] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                BuscarPasajeroC(auth.idUser).then((response) => {
                    try {
                        setId(response.pasajero[0].id_tarjeta_pasajero._id);
                        setBloqueo(response.pasajero[0].id_tarjeta_pasajero.disponible);
                        formik.setFieldValue("codigo", response.pasajero[0].id_tarjeta_pasajero.codigo);
                        formik.setFieldValue("tipo", response.pasajero[0].id_tipo_pasajero.nombre);
                        formik.setFieldValue("valor", "$ " + response.pasajero[0].id_tarjeta_pasajero.valor_tarjeta.toString());
                    } catch (error) {
                        Toast.show("Error de Conexión", {
                            position: Toast.positions.CENTER,
                        });
                    }
                });
            })();
        }, [])
    );

    const logoutAccount = () => {
        if (Bloqueo) {
            Alert.alert(
                "Advertencia",
                "¿Deseas Bloquear tarjeta?",
                [{ text: "NO" }, { text: "SI", onPress: Bloquear }],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Advertencia",
                "¿Deseas Desbloquear tarjeta?",
                [{ text: "NO" }, { text: "SI", onPress: DesBloquear }],
                { cancelable: false }
            );
        }

    };

    const Bloquear = () => {
        ActivarTarjetaApp(Id, false);
        setTimeout(function () {
            Toast.show("Tarjeta bloqueada", {
                position: Toast.positions.CENTER,
            });
            navigation.goBack();
        }, 1000);
    }


    const DesBloquear = () => {
        ActivarTarjetaApp(Id, true);
        setTimeout(function () {
            Toast.show("Tarjeta Desbloqueada", {
                position: Toast.positions.CENTER,
            });
            navigation.goBack();
        }, 1000);
    }


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
            } catch (error) {
                Toast.show("Error al actualizar los datos.", {
                    position: Toast.positions.CENTER,
                });
            }
            setLoading(false);
        },
    });

    return (


        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>

            <View style={styles.container}>
                <TextInput
                    label="Código de la tarjeta actual"
                    style={formStyle.input}
                    value={formik.values.codigo}
                    editable={false}
                />
                <TextInput
                    label="Tipo de Tarjeta"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue("tipo", text)}
                    value={formik.values.tipo}
                    error={formik.errors.tipo}
                    editable={false}
                />
                <TextInput
                    label="valor Actual"
                    style={formStyle.input}
                    value={formik.values.valor}
                    editable={false}
                />
                <Button
                    mode="contained"
                    style={formStyle.btnSucces}
                    onPress={logoutAccount}
                    loading={loading}
                >
                    {Bloqueo ? "Bloquear Tarjeta" : "Desbloquear Tarjeta"}
                </Button>
            </View>
        </KeyboardAvoidingView>

    )
}

function initialValues() {
    return {
        codigo: "",
        tipo: "",
        valor: "",
    };
}

function validationSchema() {
    return {
        codigo: Yup.string().required(true)
    };
}


var styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});