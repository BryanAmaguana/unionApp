import { API_URL } from "../utils/constants";

/* Crear nuevo Pasajero */
export function CrearPasajero(data) {
  const url = `${API_URL}/AgregarPasajero`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

/* Crear nuevo Pasajero codigo y cedula */
export function BuscarPasajeroCId(cedula_persona, id_tarjeta_pasajero) {
  const url = `${API_URL}/BuscarPasajeroCedulaId/${cedula_persona}/${id_tarjeta_pasajero}`;
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

/* Crear nuevo Pasajero codigo y cedula */
export function BuscarPasajeroC(cedula_persona) {
  const url = `${API_URL}/BuscarPasajeroApp/${cedula_persona}`;
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

/* Actualizar Tarjeta Pasajero */

export function ActualizarPasajero(pasajero, pasajeroId) {
  const url = `${API_URL}/ActualizarPasajeroApp/${pasajeroId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pasajero)
  };


  return fetch(url, params)
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
