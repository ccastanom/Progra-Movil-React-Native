import React, { useState } from "react";
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar,} from "react-native";
import SvgIcon from "./assets/SvgIcon"; // Logo en formato SVG
import Fondo from "./assets/fondo.jpeg";

export default function App() {
  // Estado para manejar el email ingresado
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      {/* Barra de estado (colores y estilo del header del sistema) */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.container}>
        {/* -------- NAVBAR -------- */}
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

        {/* -------- IMAGEN PRINCIPAL -------- */}
        <ImageBackground
          source={require("./assets/fondo.jpeg")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }} // Imagen se ajusta al contenedor
        >
          {/* Texto sobre la imagen */}
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerText}>
              No te quedes con el antojo y pide tu rollo ahora
            </Text>
          </View>
        </ImageBackground>

        {/* -------- CONTENIDO PRINCIPAL -------- */}
        <View style={styles.content}>
          {/* Texto introductorio */}
          <Text style={styles.subtitle}>
            Una deliciosa sorpresa está por llegar, entra en la lista de espera
          </Text>

          {/* Campo de entrada de email */}
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Botón de continuar */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          {/* Logo grande de adorno (parte inferior) */}
          <View style={styles.imgEnd}>
            <SvgIcon width={300} height={300} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Contenedor seguro (ajusta al notch de iOS/Android)
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  /* -------- NAVBAR -------- */
  navBar: {
  height: 75,
  backgroundColor: "#ffffffcc", // Fondo blanco semitransparente
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,

  position: "absolute", // Barra flotante sobre la imagen
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10, // Para que quede arriba de la imagen
  },

  logoWrap: {
    justifyContent: "center",
    alignItems: "center",
  },

  topButton: {
    backgroundColor: "#E91E63",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  topButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  menuIcon: {
    fontSize: 28,
    color: "#E91E63",
  },

  /* -------- IMAGEN PRINCIPAL -------- */
  headerImage: {
    width: "105%", // Un poco más ancho para que llegue al borde
    height: 400,
    justifyContent: "flex-end",
    padding: 20,
  },

  headerTextWrap: {
    marginTop: "auto",
    textAlign: "left",
    marginRight: 100, // Hace que el texto no ocupe todo el ancho
  },

  headerText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "400",
    lineHeight: 35,
  },

  /* -------- CONTENIDO PRINCIPAL -------- */
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "left",
    marginVertical: 20,
    fontWeight: "600",
    color: "#333",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  imgEnd: {
    opacity: 0.5, // Logo decorativo más tenue
  },
});
