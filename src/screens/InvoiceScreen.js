import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { money } from "../utils/format";
import useThemeColors from "../styles/themes";

export default function InvoiceScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useThemeColors();
  const { purchaseId } = route.params;

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const invoiceRef = doc(db, "users", user.uid, "purchases", purchaseId);
        const docSnap = await getDoc(invoiceRef);

        if (docSnap.exists()) {
          setInvoice(docSnap.data());
        }
      } catch (error) {
        console.error("Error al obtener la factura:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [purchaseId]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <Text style={{ color: colors.text }}>No se encontró la factura.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.bg },
      ]}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.primary }]}>
          🧾 Factura de compra
        </Text>

        <View style={styles.infoBox}>
          <Text style={[styles.label, { color: colors.subtext }]}>Nombre</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {invoice.name}
          </Text>

          <Text style={[styles.label, { color: colors.subtext }]}>Dirección</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {invoice.address}
          </Text>

          <Text style={[styles.label, { color: colors.subtext }]}>Fecha</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {invoice.createdAt?.toDate
              ? invoice.createdAt.toDate().toLocaleString()
              : "—"}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={[styles.subtitle, { color: colors.primary }]}>
          Productos
        </Text>

        <View style={styles.itemContainer}>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.itemText, { color: colors.text }]}>
                {item.name} (x{item.quantity})
              </Text>
              <Text style={[styles.itemText, { color: colors.text }]}>
                {money(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={[styles.total, { color: colors.primary }]}>
          Total: {money(invoice.total)}
        </Text>

        <Text style={[styles.footer, { color: colors.subtext }]}>
          ¡Gracias por tu compra en Que Rollo! ♥️ 
        </Text>

        {/* Botón para volver al inicio */}
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Principal")} 
        >
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
  },
  footer: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14,
  },
  backButton: {
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
