import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SvgIcon from "../../assets/SvgIcon"; // ajusta la ruta según tu estructura

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      {/* Logo */}
      <View style={styles.logoWrap}>
        <SvgIcon width={40} height={40} />
      </View>

      {/* Botón superior */}
      <TouchableOpacity style={styles.topButton}>
        <Text style={styles.topButtonText}>QUIERO MI ROLLO</Text>
      </TouchableOpacity>

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
  topButton: {
    backgroundColor: "#E91E63",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  topButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  menuIcon: { fontSize: 28, color: "#E91E63" },
});
