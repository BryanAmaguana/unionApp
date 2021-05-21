import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
  try {
    const url = `${API_URL}/AgregarPersona`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* Obtener persona por la cedula */

export function ObtenerPasajeroCedula(cedula) {
  const url = `${API_URL}/BuscarPasajeroCedula/${cedula}/true`;
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

/* Obtener persona por la cedula */

export function ObtenerPersonaCedula(cedula) {
  const url = `${API_URL}/ObtenerCedulaPersonaApp/${cedula}`;
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

export function ActualizarPersona(persona, personaId) {
  const url = `${API_URL}/ActualizarPersonaApp/${personaId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona)
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

/*

export async function updateUserApi(auth, formData) {
  try {
    const url = `${API_URL}/users/${auth.idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
} */
