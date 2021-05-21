import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formStyle } from "../../style"
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { BuscarPasajeroC } from "../../api/pasajero"
import { ActualizarPersona } from "../../api/persona"
import { layoutStyle } from "../../style";
import { ScrollView } from "react-native"


export default function ChangeName() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [persona, setpersona] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                BuscarPasajeroC(auth.idUser).then((response) => {
                    try {
                        setpersona(response.pasajero[0].id_persona._id);
                        formik.setFieldValue("cedula_persona", response.pasajero[0].id_persona.cedula_persona);
                        formik.setFieldValue("nombre_persona", response.pasajero[0].id_persona.nombre_persona);
                        formik.setFieldValue("apellido_persona", response.pasajero[0].id_persona.apellido_persona);
                        formik.setFieldValue("direccion_persona", response.pasajero[0].id_persona.direccion_persona);
                        formik.setFieldValue("celular_persona", response.pasajero[0].id_persona.celular_persona);
                        formik.setFieldValue("fecha_nacimiento_persona", response.pasajero[0].id_persona.fecha_nacimiento_persona.substring(0, 10));
                    } catch (error) {
                        Toast.show("Error de Conexión", {
                            position: Toast.positions.CENTER,
                        });
                    }
                });
            })();
        }, [])
    );


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await ActualizarPersona({
                    nombre_persona: formData.nombre_persona,
                    apellido_persona: formData.apellido_persona,
                    direccion_persona: formData.direccion_persona,
                    celular_persona: formData.celular_persona
                }, persona).then((response) => {
                    Toast.show(response.message, {
                        position: Toast.positions.CENTER,
                    });
                });
                navigation.goBack();
            } catch (error) {
                Toast.show("Error al actualizar los datos.", {
                    position: Toast.positions.CENTER,
                });
            }
            setLoading(false);
        },
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
                <ScrollView>
                    <TextInput
                        label="Cedula"
                        style={formStyle.input}
                        value={formik.values.cedula_persona}
                        editable={false}
                    />
                    <TextInput
                        label="Nombre"
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("nombre_persona", text)}
                        value={formik.values.nombre_persona}
                        error={formik.errors.nombre_persona}
                    />
                    <TextInput
                        label="Apellido"
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("apellido_persona", text)}
                        value={formik.values.apellido_persona}
                        error={formik.errors.apellido_persona}
                    />
                    <TextInput
                        label="Dirección"
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("direccion_persona", text)}
                        value={formik.values.direccion_persona}
                        error={formik.errors.direccion_persona}
                    />

                    <TextInput
                        label="Celular"
                        style={formStyle.input}
                        onChangeText={(text) => formik.setFieldValue("celular_persona", text)}
                        value={formik.values.celular_persona}
                        error={formik.errors.celular_persona}
                        maxLength={10}
                        keyboardType="numeric"

                    />
                    <TextInput
                        label="Fecha de Nacimiento"
                        style={formStyle.input}
                        value={formik.values.fecha_nacimiento_persona}
                        editable={false}
                    />
                    <Text style={formStyle.MensajeTarjeta}>
                        No se puede Actualizar La fecha de Nacimiento
                    </Text>
                    <Button
                        mode="contained"
                        style={formStyle.btnSucces}
                        onPress={formik.handleSubmit}
                        loading={loading}
                    >
                        Actualizar Datos
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

function initialValues() {
    return {
        nombre_persona: "",
        apellido_persona: "",
        direccion_persona: "",
        celular_persona: "",
    };
}

function validationSchema() {
    return {
        nombre_persona: Yup.string().required(true),
        apellido_persona: Yup.string().required(true),
        direccion_persona: Yup.string().required(true),
        celular_persona: Yup.string().required(true),
    };
}


var styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});