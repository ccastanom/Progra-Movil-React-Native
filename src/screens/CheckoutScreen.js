import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useUi } from "../context/UiContext";
import useThemeColors from "../styles/Themes"; // 👈 Importa tu hook de temas

export default function CheckoutScreen({ route, navigation }) {
  const { fontScale } = useUi();
  const { colors, isDark } = useThemeColors(); // 👈 Obtiene los colores del tema actual
  const { total } = route.params;
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) {
      navigation.navigate("Payment", { total });
    } else {
      Alert.alert("Aviso", "Debes aceptar los términos y condiciones.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: isDark ? "#000" : "#888",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: 22 * fontScale,
            },
          ]}
        >
          Resumen de compra
        </Text>

        <Text
          style={[
            styles.total,
            {
              color: colors.primary,
              fontSize: 26 * fontScale,
            },
          ]}
        >
          Total: ${total?.toLocaleString("es-CO")}
        </Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAccepted(!accepted)}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: accepted ? colors.primary : "transparent",
                borderColor: colors.border,
              },
            ]}
          />
          <Text
            style={[
              styles.checkboxText,
              { color: colors.subtext, fontSize: 16 * fontScale },
            ]}
          >
            Acepto los términos y condiciones
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: accepted
                ? colors.primary
                : colors.border,
            },
          ]}
          disabled={!accepted}
          onPress={handleContinue}
        >
          <Text
            style={[
              styles.buttonText,
              { color: accepted ? "#fff" : colors.subtext },
            ]}
          >
            Continuar con el pago
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 25,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  total: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 10,
  },
  checkboxText: {
    flexShrink: 1,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
