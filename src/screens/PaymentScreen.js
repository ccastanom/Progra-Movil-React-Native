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

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params;
  const { clearCart } = useCart();

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [terms, setTerms] = useState(false);

  const handlePayment = () => {
    if (!name || !card || !expiry || !cvv || !address) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }
    if (!terms) {
      Alert.alert("Términos", "Debes aceptar los términos y condiciones.");
      return;
    }

    Alert.alert("Procesando pago...", "Por favor espera unos segundos.");

    setTimeout(() => {
      Alert.alert("Pago exitoso 🎉", "Tu compra se ha completado con éxito.", [
        {
          text: "Aceptar",
          onPress: () => {
            clearCart();
            navigation.reset({
              index: 0,
              routes: [{ name: "Principal" }],
            });
          },
        },
      ]);
    }, 1200);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pasarela de Pago 💳</Text>

      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>
          {card ? card.replace(/\d(?=\d{4})/g, "*") : "**** **** **** ****"}
        </Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardHolder}>{name || "NOMBRE DEL TITULAR"}</Text>
          <Text style={styles.cardExpiry}>{expiry || "MM/AA"}</Text>
        </View>
      </View>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Juan Pérez"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Número de tarjeta</Text>
      <TextInput
        style={styles.input}
        placeholder="**** **** **** 1234"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={16}
        value={card}
        onChangeText={setCard}
      />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Expira (MM/AA)</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/AA"
            placeholderTextColor="#888"
            value={expiry}
            onChangeText={setExpiry}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="***"
            placeholderTextColor="#888"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Calle 123 #45-67"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.terms}>
        <TouchableOpacity onPress={() => setTerms(!terms)}>
          <View style={[styles.checkbox, terms && styles.checked]} />
        </TouchableOpacity>
        <Text style={styles.termsText}>Acepto los términos y condiciones</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  cardPreview: {
    backgroundColor: "#1e1e2e",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 15,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolder: { color: "#ccc", textTransform: "uppercase" },
  cardExpiry: { color: "#ccc" },
  label: { color: "#ccc", marginTop: 10, marginBottom: 5 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  terms: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#888",
    marginRight: 10,
    borderRadius: 4,
  },
  checked: { backgroundColor: "#1e90ff" },
  termsText: { color: "#ccc", flex: 1 },
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
