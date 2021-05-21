import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  btnSucces: {
    padding: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    marginTop: 10,
  },
  btnTextLabel: {
    color: colors.dark,
  },
  btnFecha: {
    backgroundColor: colors.btnfecha,
    marginBottom: 20,
  },

  MensajeFecha: {
    marginBottom: 20,
    textAlign: "center",
  },
  MensajeFechaA: {
    marginBottom: 20,
    color: colors.btnfechaA,
    textAlign: "center",
  },

  MensajeTarjeta: {
    marginBottom: 20,
    color: colors.Negro,
    textAlign: "center",
  },
});

export default formStyles;
