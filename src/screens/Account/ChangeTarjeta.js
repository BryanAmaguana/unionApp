import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formStyle } from "../../style"
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { BuscarPasajeroC, ActualizarPasajero } from "../../api/pasajero"
import { ObtenerTarjetaCodigoApp2 } from "../../api/tarjeta"
import { layoutStyle } from "../../style";
import { ScrollView } from "react-native"


export default function ChangeTarjeta() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [persona, setpersona] = useState(true);
    const [Codigo, SetCodigo] = useState(true);
    const [Id_Tarjeta, SetId_Tarjeta] = useState(true);
    const navigation = useNavigation();
    const [TipoPasajero, SetTipoPasajero] = useState(true);
    const [TipoTarjeta, SetTipoTarjeta] = useState(true);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                BuscarPasajeroC(auth.idUser).then((response) => {
                    try {
                        setpersona(response.pasajero[0]._id);
                        SetTipoPasajero(response.pasajero[0].id_tipo_pasajero.nombre);
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


    useFocusEffect(
        useCallback(() => {
            (async () => {
                ObtenerTarjetaCodigoApp2(Codigo).then((response) => {
                    try {
                        SetId_Tarjeta(response.tarjeta[0]._id);
                        SetTipoTarjeta(response.tarjeta[0].descripcion.nombre);
                        formik.setFieldValue("Tipo_Nuevo", response.tarjeta[0].descripcion.nombre);
                        formik.setFieldValue("Valor_Nuev0", "$ " + response.tarjeta[0].valor_tarjeta.toString());
                    } catch (error) {
                        formik.setFieldValue("Tipo_Nuevo", "");
                        formik.setFieldValue("Valor_Nuev0", "");
                    }
                });
            })();
        }, [Codigo])
    );


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                if (TipoPasajero === TipoTarjeta) {
                    await ActualizarPasajero({ id_tarjeta_pasajero: Id_Tarjeta }, persona).then((response) => {
                        Toast.show(response.message, {
                            position: Toast.positions.CENTER,
                        });
                    });
                    navigation.goBack();
                } else {
                    Toast.show("La tarjeta no es para un " + TipoPasajero, {
                        position: Toast.positions.CENTER,
                    });
                }
            } catch (error) {
                Toast.show("Error al actualizar los datos.", {
                    position: Toast.positions.CENTER,
                });
            }
            setLoading(false);
        },
    });

    return (
        <View style={layoutStyle.container}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={formStyle.MensajeTarjeta}>
                            Datos Tarjeta Actual
                        </Text>
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
                        <Text style={formStyle.MensajeTarjeta}>
                            Datos Nueva Tarjeta
                        </Text>
                        <TextInput
                            label="Código nueva tarjeta"
                            style={formStyle.input}
                            onChangeText={(text) => { formik.setFieldValue("codigo_nuevo", text), SetCodigo(text) }}
                            value={formik.values.codigo_nuevo}
                            error={formik.errors.codigo_nuevo}
                        />
                        <TextInput
                            label="Tipo de Tarjeta"
                            style={formStyle.input}
                            editable={false}
                            value={formik.values.Tipo_Nuevo}
                            error={formik.errors.Tipo_Nuevo}
                        />
                        <TextInput
                            label="valor Actual"
                            style={formStyle.input}
                            editable={false}
                            value={formik.values.Valor_Nuev0}
                            error={formik.errors.Valor_Nuev0}

                        />
                        <Button
                            mode="contained"
                            style={formStyle.btnSucces}
                            onPress={formik.handleSubmit}
                            loading={loading}
                        >
                            Actualizar Tarjeta
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

function initialValues() {
    return {
        codigo: "",
        tipo: "",
        valor: "",
        codigo_nuevo: "",
        Tipo_Nuevo: "",
        Valor_Nuev0: ""
    };
}

function validationSchema() {
    return {
        codigo_nuevo: Yup.string().required(true)
    };
}


var styles = StyleSheet.create({
    container: {
    },
});