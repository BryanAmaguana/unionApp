import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import Logo from "../../../assets/Tarjeta.png";

export default function Datos(props) {
    const { Pasajero } = props;

    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    return (
        <View style={styles.container}>
            <View style={styles.containerProduct}>
                <View style={styles.product}>

                    <ImageBackground
                        source={Logo}
                        style={styles.logo}
                    >
                        <Text style={styles.Valor}>     Valor Actual:  ${Pasajero.id_tarjeta_pasajero.valor_tarjeta ? Pasajero.id_tarjeta_pasajero.valor_tarjeta : ".."}</Text>
                        <Text style={styles.ValorNombre}>     {Pasajero.id_persona.nombre_persona ? Pasajero.id_persona.nombre_persona : ".."} {Pasajero.id_persona.apellido_persona ? Pasajero.id_persona.apellido_persona : ".."}</Text>
                        <Text style={styles.ValorNombre}>     {Pasajero.id_tipo_pasajero.nombre ? Pasajero.id_tipo_pasajero.nombre : ".."}</Text>
                    </ImageBackground >

                </View>

                <View>
                    <Text></Text>
                </View>

                <View style={stylesDatos.containerProduct}>
                    <View style={stylesDatos.product}>
                        <Text style={styles.title}>Datos del Pasajero</Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Nombre : </B> {Pasajero.id_persona.nombre_persona}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Apellido: </B> {Pasajero.id_persona.apellido_persona}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Celular:</B>   {Pasajero.id_persona.celular_persona}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Dirección: </B>  {Pasajero.id_persona.direccion_persona}
                        </Text>
                    </View>
                </View>


                <View style={stylesDatos.containerProduct}>
                    <View style={stylesDatos.product}>
                        <Text style={styles.title}>Datos de la tarjeta</Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Código : </B> {Pasajero.id_tarjeta_pasajero.codigo}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Valor Actual: </B> ${Pasajero.id_tarjeta_pasajero.valor_tarjeta}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Bloqueo:</B>   {Pasajero.id_tarjeta_pasajero.bloqueo ? Pasajero.id_tarjeta_pasajero.bloqueo : "Ninguno"}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Tipo de tarjeta: </B>  {Pasajero.id_tipo_pasajero.nombre}
                        </Text>
                        <Text style={stylesDatos.name} numberOfLines={1} ellipsizeMode="tail">
                            <B>Tarifa: </B>  {Pasajero.id_tipo_pasajero.valor}
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    )
}


const stylesDatos = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
    },
    containerProduct: {
        width: "100%",
        padding: 3,
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
        marginTop: 15,
        fontSize: 18,

    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
    },
    containerDatos: {
        padding: 10,
    },
    Valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#ffffff',
        marginTop: 70,
    },

    ValorNombre: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#ffffff',
        marginTop: 40,
    },

    logo: {
        width: "100%",
        height: "100%",

    },
    containerProduct: {
        width: "100%",
        padding: 3,
    },
    product: {
        width: "100%",
        height: "100%",
        height: 280,
        padding: 5,
    },

    image: {
        height: 150,
        resizeMode: "contain",
    },

    name: {
        marginTop: 15,
        fontSize: 18,
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 22,

    },
});
