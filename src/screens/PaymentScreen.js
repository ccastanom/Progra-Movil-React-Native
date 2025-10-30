import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { money } from "../utils/Format";
import { useUi } from "../context/UiContext";
import useThemeColors from "../styles/Themes";
import { db } from "../firebase/Config";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params;
  const { clearCart, cartItems } = useCart();
  const { fontScale } = useUi();
  const { colors } = useThemeColors();

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validaciones
  const validateFields = () => {
    if (!name || !card || !expiry || !cvv || !address) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return false;
    }

    if (name.length < 3 || name.length > 20) {
      Alert.alert("Nombre inválido", "Debe tener entre 3 y 20 caracteres.");
      return false;
    }

    // Validar formato MM/AA
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      Alert.alert("Fecha inválida", "Usa el formato MM/AA (por ejemplo 07/28).");
      return false;
    }

    // Validar fecha no expirada
    const [month, year] = expiry.split("/").map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      Alert.alert("Tarjeta vencida", "La fecha de expiración no es válida.");
      return false;
    }

    // Validar CVV
    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert("CVV inválido", "Debe tener exactamente 3 números.");
      return false;
    }

    if (!terms) {
      Alert.alert("Términos", "Debes aceptar los términos y condiciones.");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateFields()) return;

    setLoading(true);
    Alert.alert("Procesando pago...", "Por favor espera unos segundos.");

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        Alert.alert("Sesión requerida", "Debes iniciar sesión para pagar.");
        return;
      }

      // Guardar compra en Firestore
      const userRef = doc(db, "users", user.uid);
      const purchasesRef = collection(userRef, "purchases");
      const docRef = await addDoc(purchasesRef, {
        name,
        address,
        total,
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        createdAt: serverTimestamp(),
      });

      setTimeout(() => {
        setLoading(false);
        clearCart();
        navigation.navigate("Invoice", { purchaseId: docRef.id });
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Error al registrar la compra:", error);
      Alert.alert("Error", "Hubo un problema al procesar el pago.");
    }
  };

  // Formato automático MM/AA
  const handleExpiryChange = (text) => {
    // Eliminar caracteres no numéricos
    let formatted = text.replace(/[^0-9]/g, "");

    // Insertar la barra automáticamente después de 2 números
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4);
    }

    setExpiry(formatted);
  };

  // CVV solo números (máx 3)
  const handleCvvChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, "").slice(0, 3);
    setCvv(numeric);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text
        style={[styles.title, { color: colors.text, fontSize: 24 * fontScale }]}
      >
        Pasarela de Pago 💳
      </Text>

      {/* Vista previa de tarjeta */}
      <View
        style={[
          styles.cardPreview,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.cardNumber,
            { color: colors.text, fontSize: 20 * fontScale },
          ]}
        >
          {card ? card.replace(/\d(?=\d{4})/g, "*") : "**** **** **** ****"}
        </Text>
        <View style={styles.cardRow}>
          <Text
            style={[
              styles.cardHolder,
              { color: colors.subtext, fontSize: 14 * fontScale },
            ]}
          >
            {name || "NOMBRE DEL TITULAR"}
          </Text>
          <Text
            style={[
              styles.cardExpiry,
              { color: colors.subtext, fontSize: 14 * fontScale },
            ]}
          >
            {expiry || "MM/AA"}
          </Text>
        </View>
      </View>

      {/* Campos */}
      <Text style={[styles.label, { color: colors.subtext }]}>
        Nombre completo
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Ej: Juan Pérez"
        placeholderTextColor={colors.subtext}
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, { color: colors.subtext }]}>
        Número de tarjeta
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="**** **** **** 1234"
        placeholderTextColor={colors.subtext}
        keyboardType="numeric"
        maxLength={16}
        value={card}
        onChangeText={(text) => setCard(text.replace(/[^0-9]/g, ""))}
      />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.label, { color: colors.subtext }]}>
            Expira (MM/AA)
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="MM/AA"
            placeholderTextColor={colors.subtext}
            value={expiry}
            onChangeText={handleExpiryChange}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: colors.subtext }]}>CVV</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="***"
            placeholderTextColor={colors.subtext}
            secureTextEntry
            keyboardType="numeric"
            maxLength={3}
            value={cvv}
            onChangeText={handleCvvChange}
          />
        </View>
      </View>

      <Text style={[styles.label, { color: colors.subtext }]}>Dirección</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Ej: Calle falsa #12-34"
        placeholderTextColor={colors.subtext}
        value={address}
        onChangeText={setAddress}
      />

      {/* Términos */}
      <View style={styles.terms}>
        <TouchableOpacity onPress={() => setTerms(!terms)}>
          <View
            style={[
              styles.checkbox,
              {
                borderColor: colors.border,
                backgroundColor: terms ? colors.primary : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.termsText,
            { color: colors.subtext, fontSize: 14 * fontScale },
          ]}
        >
          Acepto los términos y condiciones.
        </Text>
      </View>

      <Text
        style={[styles.total, { color: colors.primary, fontSize: 18 * fontScale }]}
      >
        Total a pagar: {money(total)}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: loading ? colors.border : colors.primary },
        ]}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text
          style={[styles.buttonText, { color: "#fff", fontSize: 16 * fontScale }]}
        >
          {loading ? "Procesando..." : "Confirmar pago"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  cardPreview: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
  },
  cardNumber: {
    letterSpacing: 2,
    marginBottom: 15,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolder: { textTransform: "uppercase" },
  cardExpiry: {},
  label: { marginTop: 10, marginBottom: 5 },
  input: {
    borderRadius: 8,
    padding: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  terms: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 5,
  },
  termsText: { flex: 1 },
  total: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
