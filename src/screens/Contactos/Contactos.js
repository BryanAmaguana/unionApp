import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native'
import { ObtenerContenidoApi } from "../../api/datos"
import ScreenLoading from "../ScreenLoading";

export default function Contactos() {
    const [Datos, setdatos] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                ObtenerContenidoApi().then((response) => {
                    try {
                        setdatos(response.contenido[0]);
                    } catch (error) {
                        console.log(error)
                        Toast.show("Error de Conexión", {
                            position: Toast.positions.CENTER,
                        });
                    }
                });
            } catch (error) {
                Toast.show("Error de Conexión", {
                    position: Toast.positions.CENTER,
                });
            }
        })();
    }, []);

    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    return (
        <>
            {!Datos ? (
                <ScreenLoading size="large" />
            ) : (
                <>
                    <View style={stylesDatos.containerProduct}>
                        <View style={stylesDatos.product}>
                            <Text style={stylesDatos.title}>Contacto</Text>
                            <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Email : </B> {Datos.correo}
                            </Text>
                            <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Teléfono: </B> {Datos.telefono}
                            </Text>
                            <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Celular:</B> {Datos.Celular}
                            </Text>
                            <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Dirección: </B> {Datos.direccion}
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </>
    )
}

const stylesDatos = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 22,

    },
    containerProduct: {
        width: "100%",
        padding: 30,
    },
    product: {
        backgroundColor: "#f0f0f0",
        padding: 10,
    },
    image: {
        height: 150,
        resizeMode: "contain",
    },
    name: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18,

    },
});