import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useUi } from "../context/UiContext";
export default function CheckoutScreen({ route, navigation }) {
  const { theme, fontScale } = useUi();
  const dark = theme === "dark";
  const { total } = route.params; 
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) {
      navigation.navigate("Payment", { total });
    } else {
      alert("Debes aceptar los términos y condiciones para continuar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumen de compra</Text>
      <Text style={styles.total}>Total: ${total?.toLocaleString("es-CO")}</Text>

      <TouchableOpacity
        style={[styles.checkbox, accepted && styles.checkboxChecked]}
        onPress={() => setAccepted(!accepted)}
      >
        <Text style={styles.checkboxText}>
          {accepted ? "✅ Aceptado" : "☐ Aceptar términos y condiciones"}
        </Text>
      </TouchableOpacity>

      <Button title="Continuar con el pago" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  total: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  checkbox: {
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
  },
  checkboxChecked: {
    opacity: 0.7,
  },
});
