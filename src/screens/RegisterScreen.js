import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import useThemeColors from "../styles/themes";

// Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

// Pantalla de registro
export default function RegisterScreen({ navigation }) {
  const { colors, isDark } = useThemeColors();
  const auth = getAuth(app);

  // Estados para el formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Funcion para manejar el registro
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Registro con Firebase Auth
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Guardar datos en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
      Alert.alert("Éxito 🎉", "Tu cuenta ha sido creada con éxito");
      navigation.replace("Principal");
    } catch (error) {
      console.error(error);
      let message = "Ocurrió un error al registrar";
      if (error.code === "auth/email-already-in-use")
        message = "El correo ya está registrado";
      if (error.code === "auth/invalid-email") message = "Correo inválido";
      if (error.code === "auth/weak-password")
        message = "La contraseña es muy débil";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  // Renderizado
  return (
    // Contenedor principal
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* NavBar */}
      <View style={[styles.navBar, { backgroundColor: colors.card }]}>
        <View style={styles.logoWrap}>
          <SvgIcon width={40} height={40} />
        </View>
        <Text style={[styles.brand, { color: colors.text }]}>REGISTRO</Text>
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
            Crea tu cuenta y empieza a disfrutar 😋
          </Text>
        </View>
      </ImageBackground>

      {/* Formulario */}
      <View style={styles.content}>
        <TextInput
          placeholder="Nombre completo"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.text,
              backgroundColor: isDark ? "#1e1e1e" : "rgba(255,255,255,0.9)",
            },
          ]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.text,
              backgroundColor: isDark ? "#1e1e1e" : "rgba(255,255,255,0.9)",
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.text,
              backgroundColor: isDark ? "#1e1e1e" : "rgba(255,255,255,0.9)",
            },
          ]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarme</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: colors.text }}>
            ¿Ya tienes cuenta?{" "}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Inicia sesión
            </Text>
          </Text>
        </TouchableOpacity>

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
    height: 350,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerTextWrap: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 22,
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
  imgEnd: { opacity: 0.5, marginTop: 20 },
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
