import React, { useState } from "react";
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,
} from "react-native";
import SvgIcon from "../../assets/SvgIcon"; // Ajusta la ruta según tu estructura

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  return (


    <View style={styles.container}>
      <View style={styles.navBar}>
          {/* Logo */}
          <View style={styles.logoWrap}>
            <SvgIcon width={40} height={40} />
          </View>

          {/* Botón superior principal */}
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>QUIERO MI ROLLO</Text>
          </TouchableOpacity>

          {/* Menú (icono hamburguesa) */}
          <Text style={styles.menuIcon}>☰</Text>
        </View>
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerText}>
            No te quedes con el antojo y pide tu rollo ahora
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Una deliciosa sorpresa está por llegar, entra en la lista de espera
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <View style={styles.imgEnd}>
          <SvgIcon width={300} height={300} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImage: { width: "105%", height: 400, justifyContent: "flex-end", padding: 20 },
  headerTextWrap: { marginTop: "auto", textAlign: "left", marginRight: 100 },
  headerText: { fontSize: 30, color: "#fff", fontWeight: "400", lineHeight: 35 },
  content: { flex: 1, alignItems: "center", padding: 20 },
  subtitle: { fontSize: 16, textAlign: "left", marginVertical: 20, fontWeight: "600", color: "#333" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 20 },
  button: { backgroundColor: "#E91E63", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  imgEnd: { opacity: 0.5 },
  navBar: {
    height: 75,
    backgroundColor: "#ffffffcc",
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
  topButton: { backgroundColor: "#E91E63", paddingVertical: 9, paddingHorizontal: 15, borderRadius: 20 },
  topButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  menuIcon: { fontSize: 28, color: "#E91E63" },
});
