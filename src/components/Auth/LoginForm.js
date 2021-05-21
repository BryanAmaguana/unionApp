import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { BuscarPasajeroCId } from "../../api/pasajero";
import { formStyle } from "../../style";
import useAuth from "../../hooks/useAuth";
import { ObtenerTarjetaCodigoApp } from "../../api/tarjeta";

export default function LoginForm(props) {
  const { setShowLogin } = props;
  const [loading, setLoading] = useState(false);
  const [pasajeroData, setPasajeroData] = useState({});
  const { login } = useAuth();

  const showRegister = () => setShowLogin((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await ObtenerTarjetaCodigoApp(formData.codigo, true).then(
          (response) => {
            try {
              if (response.tarjeta[0].codigo) {
                BuscarPasajeroCId(
                  formData.cedula_persona,
                  response.tarjeta[0]._id
                ).then((response) => {
                  try {
                    if (response.pasajero[0]._id) {
                      setLoading(false);
                      login(response);
                    }
                  } catch (error) {
                    Toast.show("Datos incorrectos", {
                      position: Toast.positions.CENTER,
                    });
                    setLoading(false);
                  }
                });
              } else {
                setPasajeroData([]);
              }
            } catch (error) {
              setTimeout(function () {
                Toast.show("Datos incorrectos", {
                  position: Toast.positions.CENTER,
                });
                setLoading(false);
              }, 1000);
            }
          }
        );
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Cédula"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("cedula_persona", text)}
        value={formik.values.cedula_persona}
        error={formik.errors.cedula_persona}
        keyboardType="numeric"
      />
      <TextInput
        label="Código de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("codigo", text)}
        value={formik.values.codigo}
        error={formik.errors.codigo}
      />
      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={showRegister}
      >
        Registrarse
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    cedula_persona: "",
    codigo: "",
  };
}

function validationSchema() {
  return {
    cedula_persona: Yup.string().required(true),
    codigo: Yup.string().required(true),
  };
}
