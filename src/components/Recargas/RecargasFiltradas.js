import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, } from "react-native";
import { map } from "lodash";

export default function RecargasFiltradas(props) {
    const { recargas } = props;

    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    return (
        <View style={styles.container}>
            {map(recargas, (recarga) => (
                <TouchableWithoutFeedback key={recarga._id}>
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Tarjeta: </B> {recarga.codigo_tarjeta}
                            </Text>
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Valor:</B>   {recarga.valor_recarga}
                            </Text>
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                                <B>Fecha: </B>  {recarga.fecha_hora_Accion.substr(0, 10)}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
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