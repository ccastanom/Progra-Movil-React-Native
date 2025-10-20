import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";

export default function Checkout() {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params;
  const { clearCart } = useCart();

  const handlePayment = () => {
    if (!name || !card || !address) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los campos.");
      return;
    }
    if (!termsAccepted) {
      Alert.alert("Términos", "Debes aceptar los términos y condiciones.");
      return;
    }

    // Simular pago exitoso
    Alert.alert("Pago exitoso 🎉", "Tu compra ha sido procesada con éxito.", [
      {
        text: "Aceptar",
        onPress: () => {
          clearCart(); // Vacía el carrito después de pagar
          navigation.navigate("Principal"); // Regresa a la página inicial
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Confirmar pago</Text>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Juan Pérez"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Número de tarjeta</Text>
      <TextInput
        style={styles.input}
        placeholder="**** **** **** 1234"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={card}
        onChangeText={setCard}
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Calle 123 #45-67"
        placeholderTextColor="#aaa"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.terms}>
        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
          <View style={[styles.checkbox, termsAccepted && styles.checked]} />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Acepto los términos y condiciones
        </Text>
      </View>

      <Text style={styles.total}>Total a pagar: {money(total)}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Confirmar pago</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  label: { color: "#ccc", marginTop: 10, marginBottom: 5 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  terms: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
    borderRadius: 4,
  },
  checked: { backgroundColor: "#1e90ff" },
  termsText: { color: "#ccc" },
  total: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
