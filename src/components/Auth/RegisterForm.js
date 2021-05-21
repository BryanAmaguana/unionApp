import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi, ObtenerPersonaCedula, } from "../../api/persona";
import { ObtenerTarjetaCodigoApp } from "../../api/tarjeta";
import { CrearPasajero } from "../../api/pasajero";
import { formStyle } from "../../style";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [loading, setLoading] = useState(false);
  const [pasajeroData, setPasajeroData] = useState({});
  const [Id_Tipo_Tarjeta, setId_Tipo_Tarjeta] = useState({});
  const [Fecha, setFecha] = useState({});
  const [Mensaje, setMensaje] = useState("Verificar numero de Cédula");
  const [MensajeFecha, setMensajeFecha] = useState(
    "Seleccione su fecha de nacimiento"
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showLogin = () => setShowLogin((prevState) => !prevState);

  const validarCedula = (cad) => {
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    var i;
    if (cad !== "" && longitud === 10) {
      for (i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }
      total = total % 10 ? 10 - (total % 10) : 0;
      // eslint-disable-next-line
      if (cad.charAt(longitud - 1) == total) {
        return true;
      } else {
        setMensaje("Verificar numero de Cédula");
        return false;
      }
    }
  };

  const Registrar = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      var f = new Date();
      f.setDate(f.getDate() - 1800);
      /* ----- calculo de edad */
      const TipoPasajero = () => {
        var hoy = new Date();
        var cumpleanos = new Date(Fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }
        if (edad < 18) {
          return "Estudiante";
        } else if (edad >= 18) {
          return "Adulto";
        } else if (edad >= 60) {
          return "Tercera Edad";
        }
      }
      /* -------------------- */
      if (validarCedula(formData.cedula_persona)) {
        setLoading(true);
        try {
          if (Fecha < f) {
            const mensaje = await registerApi(formData);
            if (
              mensaje === "Persona creada exitosamente." ||
              mensaje === "Numero de cédula ya registrado."
            ) {
              await ObtenerPersonaCedula(formData.cedula_persona).then(
                (response) => {
                  try {
                    if (response.persona.cedula_persona) {
                      pasajeroData.id_persona = response.persona._id;
                      pasajeroData.cedula_persona = response.persona.cedula_persona;
                    }
                  } catch (error) {
                    setTimeout(function () {
                      Toast.show("Error al registrar", {
                        position: Toast.positions.CENTER,
                      });
                      setLoading(false);
                    }, 1000);
                  }
                }
              );
              await ObtenerTarjetaCodigoApp(formData.codigo, true).then(
                (response) => {
                  try {
                    if (response.tarjeta[0].codigo) {
                      pasajeroData.id_tarjeta_pasajero = response.tarjeta[0]._id;
                      pasajeroData.id_tipo_pasajero = response.tarjeta[0].descripcion._id;
                      setId_Tipo_Tarjeta(response.tarjeta[0].descripcion.nombre);
                    }
                  } catch (error) {
                    setTimeout(function () {
                      Toast.show("Codigo de tarjeta incorrecto", {
                        position: Toast.positions.CENTER,
                      });
                      setLoading(false);
                    }, 500);
                  }
                }
              );

              if (TipoPasajero() === Id_Tipo_Tarjeta) {
                await CrearPasajero(pasajeroData).then((response) => {
                  try {
                    if (response === "Pasajero creado exitosamente.") {
                      setTimeout(function () {
                        Toast.show(response, {
                          position: Toast.positions.CENTER,
                        });
                        showLogin();
                      }, 1000);
                    } else {
                      setTimeout(function () {
                        Toast.show(response, {
                          position: Toast.positions.CENTER,
                        });
                      }, 3000);
                      setLoading(false);
                    }
                  } catch (error) {
                    setLoading(false);
                  }
                });
              } else {
                setTimeout(function () {
                  Toast.show("La tarjeta no es la correcta", {
                    position: Toast.positions.CENTER,
                  });
                  setLoading(false);
                }, 3000);
              }


            } else {
              Toast.show(mensaje, {
                position: Toast.positions.CENTER,
              });
              setLoading(false);
            }
          } else {
            Toast.show("Ingrese su verdad fecha de nacimiento", {
              position: Toast.positions.CENTER,
            });
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      } else {
        Toast.show(Mensaje, {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFecha(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setMensajeFecha(day + "/" + month + "/" + year);
    Registrar.setFieldValue(
      "fecha_nacimiento_persona",
      year + "-" + month + "-" + day
    );
    hideDatePicker();
  };

  return (
    <View>
      <TextInput
        label="Cédula"
        style={formStyle.input}
        onChangeText={(text) => Registrar.setFieldValue("cedula_persona", text)}
        value={Registrar.values.cedula_persona}
        error={Registrar.errors.cedula_persona}
        maxLength={10}
        keyboardType="numeric"
      />
      <TextInput
        label="Nombre"
        style={formStyle.input}
        onChangeText={(text) => Registrar.setFieldValue("nombre_persona", text)}
        value={Registrar.values.nombre_persona}
        error={Registrar.errors.nombre_persona}
      />
      <TextInput
        label="Apellido"
        style={formStyle.input}
        onChangeText={(text) =>
          Registrar.setFieldValue("apellido_persona", text)
        }
        value={Registrar.values.apellido_persona}
        error={Registrar.errors.apellido_persona}
      />

      <TextInput
        label="Codigo de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => Registrar.setFieldValue("codigo", text)}
        value={Registrar.values.codigo}
        error={Registrar.errors.codigo}
      />

      <Button
        mode="contained"
        style={formStyle.btnFecha}
        onPress={Registrar.handleSubmit}
        onPress={showDatePicker}
      >
        {MensajeFecha}
      </Button>

      <Text style={formStyle.MensajeFechaA}>
        Su fecha de nacimiento no podra ser cambiado ni actualizado
      </Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={Registrar.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={showLogin}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    cedula_persona: "",
    nombre_persona: "",
    apellido_persona: "",
    fecha_nacimiento_persona: "",
    direccion_persona: "",
    celular_persona: "",
    codigo: "",
  };
}

function validationSchema() {
  return {
    cedula_persona: Yup.string().required(true),
    nombre_persona: Yup.string().required(true),
    apellido_persona: Yup.string().required(true),
    codigo: Yup.string().required(true),
    fecha_nacimiento_persona: Yup.string().required(true),
  };
}
