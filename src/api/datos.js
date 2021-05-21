import { API_URL } from "../utils/constants";

/* Obtener tarjeta por el codigo */
export function ObtenerContenidoApi() {
    const url = `${API_URL}/ObtenerContenido`;
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}
