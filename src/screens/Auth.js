import React, { useState } from "react";
import Logo from "../../assets/UnionIcono.png";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { layoutStyle } from "../style";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={Logo} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
