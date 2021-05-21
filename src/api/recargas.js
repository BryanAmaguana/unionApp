import { API_URL } from "../utils/constants";

/* Obtener tarjeta por el codigo */

export function ObtenerRecargaTotalApp(Inicio, Fin, codigo) {
    const url = `${API_URL}/ObtenerRecargaTotalApp/${Inicio}/${Fin}/${codigo}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}