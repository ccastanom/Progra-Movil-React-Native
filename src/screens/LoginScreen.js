import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import useThemeColors from "../styles/themes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/config";
import {
  sendWelcomeNotification,
  scheduleRecommendationsNotification,
} from "../utils/notifications";
import { FontFamily as fonts } from "../styles/fonts";

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
      //Alert.alert("Bienvenido a Que Rollo ❤", "Inicio de sesión exitoso");

      navigation.replace("Principal");

      try {
        sendWelcomeNotification(email).catch((err) =>
          console.log("Error en notificación de bienvenida:", err)
        );

        scheduleRecommendationsNotification().catch((err) =>
          console.log("Error en notificación de recomendados:", err)
        );
      } catch (e) {
        console.log("Error general al disparar notificaciones:", e);
      }
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
        message =
          "Oops, desafortunadamente tu cuenta ha sido deshabilitada. Contacta soporte.";
      }

      Alert.alert(msm, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.centerWrapper}>
        <View style={styles.header}>
          <SvgIcon width={90} height={90} />
          <Text style={[styles.brand, { color: colors.primary }]}>
            QUE ROLLO
          </Text>

          <Text style={styles.slogan}>Pasteleria artesanal</Text>

          <Text style={styles.question}>¿Ya tienes cuenta?</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        {/* FORMULARIO */}
        <View style={styles.form}>
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor={colors.subtext}
            style={[
              styles.input,
              {
                borderColor: colors.border ?? "#E3E3E3",
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
                borderColor: colors.border ?? "#E3E3E3",
                color: colors.text,
                backgroundColor: colors.card,
              },
            ]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          {!DEV_MODE && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 16 }}
            >
              <Text style={[styles.registerText, { color: colors.text }]}>
                ¿No tienes cuenta?
                <Text style={{ color: colors.primary, fontFamily: fonts.bold }}>
                  {" "}
                  Regístrate
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  brand: {
    fontSize: 30,
    fontFamily: "CrystalTitle",
    letterSpacing: 1,
    marginTop: 6,
  },
  slogan: {
    fontSize: 14,
    fontFamily: "BalooRegular",
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 30,
  },
  question: {
    fontSize: 18,
    fontFamily: "BalooBold",
    marginTop: 14,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "BalooRegular",
    color: "#666",
  },

  form: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontFamily: "BalooRegular",
    fontSize: 14,
  },
  button: {
    paddingVertical: 11,
    borderRadius: 999,
    width: "75%",
    maxWidth: 240,
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "BalooBold",
  },
  registerText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
});
