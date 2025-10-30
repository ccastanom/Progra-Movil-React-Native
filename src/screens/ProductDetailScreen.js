import React, { useState } from "react";
import { View, Text, Button, Alert, Image, StyleSheet, ScrollView, TouchableOpacity,} from "react-native";
import NavBar from "../components/NavBar";
import { money } from "../utils/Format";
import useThemeColors from "../styles/Themes";
import { useCart } from "../context/CartContext";
import { useUi } from "../context/UiContext";

export default function ProductDetailScreen({ route, navigation }) {
  const { colors } = useThemeColors();
  const { fontScale } = useUi();
  const { product } = route.params;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const total = product.price * qty;

  // Agregar al carrito
  const handleAddToCart = () => {
    const image = product.image || product.imageUrl || "";
    const productWithImage = { ...product, image };
    addToCart(productWithImage, qty);
    Alert.alert("Éxito", `${product.name} fue agregado al carrito 🛒`);
  };

  // Comprar ahora
  const handleBuyNow = () => {
    const image = product.image || product.imageUrl || "";
    const productWithImage = { ...product, image, qty, total };
    navigation.navigate("Checkout", { total });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <NavBar showBack={true} />

      {/* Imagen */}
      <Image
        source={{ uri: product.image || product.imageUrl }}
        style={[styles.heroImage, { borderColor: colors.border }]}
      />

      {/* Nombre */}
      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: 22 * fontScale },
        ]}
      >
        {product.name}
      </Text>

      {/* Precio */}
      <Text
        style={[
          styles.price,
          { color: colors.subtext, fontSize: 16 * fontScale },
        ]}
      >
        Precio: {money(product.price)}
      </Text>

      {/* Descripcion */}
      {product.description ? (
        <Text
          style={[
            styles.description,
            { color: colors.subtext, fontSize: 15 * fontScale },
          ]}
        >
          {product.description}
        </Text>
      ) : null}

      {/* Cantidad */}
      <View style={styles.qtyRow}>
        <TouchableOpacity
          onPress={() => setQty((q) => Math.max(1, q - 1))}
          style={[styles.qtyButton, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.qtyBtnText, { color: colors.text }]}>-</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.qtyText,
            { color: colors.text, fontSize: 18 * fontScale },
          ]}
        >
          {qty}
        </Text>

        <TouchableOpacity
          onPress={() => setQty((q) => q + 1)}
          style={[styles.qtyButton, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <Text
        style={[
          styles.total,
          { color: colors.text, fontSize: 18 * fontScale },
        ]}
      >
        Total: {money(total)}
      </Text>

      {/* Botones */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={handleAddToCart}
        >
          <Text style={styles.actionText}>Agregar al carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary || "#4CAF50" }]}
          onPress={handleBuyNow}
        >
          <Text style={styles.actionText}>Comprar ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginTop: 75,
    marginBottom: 16,
    resizeMode: "cover",
    borderWidth: 1,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  price: {
    marginBottom: 12,
  },

  description: {
    lineHeight: 22,
    marginBottom: 16,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 12,
  },

  qtyText: {
    fontWeight: "600",
  },

  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  qtyBtnText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  total: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 10,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
