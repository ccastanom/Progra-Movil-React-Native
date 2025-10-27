import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Alert, ActivityIndicator,
} from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import useThemeColors from "../styles/Themes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/config";

export default function LoginScreen({ navigation }) {
  const { colors } = useThemeColors();
  const auth = getAuth(app);

  const DEV_MODE = false;

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Manejar inicio de sesión
  const handleLogin = async () => {
    // Modo desarrollo
    if (DEV_MODE) {
      Alert.alert("Modo desarrollo");
      navigation.replace("Principal");
      return;
    }

    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }
    // Iniciar sesión con Firebase Auth
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Bienvenido a Que Rollo ❤️", "Inicio de sesión exitoso");
      navigation.replace("Principal");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      let message = "Pero no te preocupes, no es tu culpa.";
      let msm = "Ocurrio un error al iniciar sesión.";
      
      // Manejo de errores comunes
      if (error.code === "auth/user-not-found") {
        msm = "Usuario no encontrado.";
        message = "Crea una cuenta para continuar.";
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        msm = "Inicio de sesión fallido.";
        message = "Contraseña incorrecta o correo invalido.";
      } else if (error.code === "auth/invalid-email") {
        msm = "Inicio de sesión fallido.";
        message = "Correo inválido";
      } else if (error.code === "auth/network-request-failed") {
        msm = "Error de red.";
        message = "Error de conexión. Revisa tu internet.";
      } else if (error.code === "auth/user-disabled") {
        msm = "Cuenta deshabilitada.";
        message = "Oops, desafortunadamente tu cuenta ha sido deshabilitada. Contacta soporte.";
      }

      Alert.alert(msm, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* NavBar */}
      <View style={[styles.navBar, { backgroundColor: colors.card }]}>
        <View style={styles.logoWrap}>
          <SvgIcon width={40} height={40} />
        </View>
        <Text style={[styles.brand, { color: colors.text }]}>QUE ROLLO</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Imagen de fondo */}
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerText}>
            El rollo perfecto para cada antojo 😋
          </Text>
        </View>
      </ImageBackground>

      {/* Formulario */}
      <View style={styles.content}>
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor={colors.subtext}
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.subtext}
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón de iniciar sesión */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {DEV_MODE ? "Entrar (modo desarrollo)" : "Iniciar sesión"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Registro */}
        {!DEV_MODE && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 12 }}
          >
            <Text style={{ color: colors.text }}>
              ¿No tienes cuenta?{" "}
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                Regístrate
              </Text>
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.imgEnd}>
          <SvgIcon width={300} height={300} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerImage: {
    width: "105%",
    height: 400,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerTextWrap: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  content: { flex: 1, alignItems: "center", padding: 20, width: "100%" },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  imgEnd: { opacity: 0.5, marginTop: 30 },
  navBar: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logoWrap: { justifyContent: "center", alignItems: "center" },
  brand: { fontSize: 18, fontWeight: "800" },
});
