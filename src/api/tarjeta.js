import { API_URL } from "../utils/constants";

/* Obtener tarjeta por el codigo */

export function ObtenerTarjetaCodigoApp(codigo, disponible) {
  const url = `${API_URL}/ObtenerTarjetaCodigoApp/${codigo}/${disponible}`;
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

export function ObtenerTarjetaCodigoApp2(codigo) {
  const url = `${API_URL}/ObtenerTarjetaCodigoApp2/${codigo}`;
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

export function ActivarTarjetaApp(TarjetaId, disponible) {
  const url = `${API_URL}/ActivarTarjetaApp/${TarjetaId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ disponible: disponible })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}