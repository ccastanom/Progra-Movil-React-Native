import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SvgIcon from "../../assets/SvgIcon";

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      {/* Logo */}
      <View style={styles.logoWrap}>
        <SvgIcon width={40} height={40} />
      </View>

      {/* Marca centrada (ya no es botón) */}
      <Text style={styles.brand}>QUE ROLLO</Text>

      {/* Menú hamburguesa */}
      <Text style={styles.menuIcon}>☰</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

  // Estilo para el logo de marca
  brand: {
    fontSize: 24,          // más grande
    fontWeight: "900",     // más grueso
    color: "#E91E63",      // fucsia
    letterSpacing: 2,      // más espacio entre letras
    textTransform: "uppercase",
  },

  menuIcon: { fontSize: 28, color: "#E91E63" },
});

