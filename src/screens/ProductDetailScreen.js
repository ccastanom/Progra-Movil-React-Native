// src/screens/ProductDetailScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import NavBar from "../components/NavBar";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params; // { id, name, price, image, description? }
  const [qty, setQty] = useState(1);

  const total = product.price * qty;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Barra superior con logo/marca */}
      <NavBar />

      {/* Imagen nítida sin overlay */}
      <Image source={product.image} style={styles.heroImage} />

      {/* Título y precio */}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Precio: ${product.price.toLocaleString()}</Text>

      {/* Descripción (opcional) */}
      {product.description ? (
        <Text style={styles.description}>{product.description}</Text>
      ) : null}

      {/* Cantidad */}
      <View style={styles.qtyRow}>
        <Button title="-" onPress={() => setQty(q => Math.max(1, q - 1))} />
        <Text style={styles.qtyText}>Cantidad: {qty}</Text>
        <Button title="+" onPress={() => setQty(q => q + 1)} />
      </View>

      {/* Total */}
      <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>

      {/* Comprar */}
      <View style={{ marginTop: 8 }}>
        <Button
          title="Comprar"
          color="#E91E63"
          onPress={() =>
            Alert.alert(
              "Compra simulada",
              `Has comprado ${qty} × ${product.name} por $${total.toLocaleString()}`
            )
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", padding: 16 },

  // Imagen principal SIN filtro
  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginTop: 75,        // espacio para el NavBar fijo
    marginBottom: 16,
    resizeMode: "cover",
  },

  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 6 },
  price: { fontSize: 16, color: "#444", marginBottom: 12 },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  qtyText: { fontSize: 18, fontWeight: "600" },

  total: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "#000" },
});


