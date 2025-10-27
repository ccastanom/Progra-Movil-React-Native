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
import { money } from "../utils/format";
import useThemeColors from "../styles/themes";
import { useCart } from "../context/CartContext";

export default function ProductDetailScreen({ route, navigation }) {
  const { colors } = useThemeColors();
  const { product } = route.params;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const total = product.price * qty;

  // ✅ Agregar al carrito
  const handleAddToCart = () => {
    const image = product.image || product.imageUrl || "";
    const productWithImage = { ...product, image };

    addToCart(productWithImage, qty);
    Alert.alert("Éxito", `${product.name} fue agregado al carrito 🛒`);
  };

  // Botón comprar
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

      {/* Imagen del producto */}
      <Image
        source={{ uri: product.image || product.imageUrl }}
        style={styles.heroImage}
      />

      {/* Nombre y precio */}
      <Text style={[styles.title, { color: colors.text }]}>{product.name}</Text>
      <Text style={[styles.price, { color: colors.subtext }]}>
        Precio: {money(product.price)}
      </Text>

      {/* Descripción */}
      {product.description ? (
        <Text style={[styles.description, { color: colors.subtext }]}>
          {product.description}
        </Text>
      ) : null}

      {/* Cantidad */}
      <View style={styles.qtyRow}>
        <Button
          title="-"
          onPress={() => setQty((q) => Math.max(1, q - 1))}
          color={colors.primary}
        />
        <Text style={[styles.qtyText, { color: colors.text }]}>
          Cantidad: {qty}
        </Text>
        <Button
          title="+"
          onPress={() => setQty((q) => q + 1)}
          color={colors.primary}
        />
      </View>

      {/* Total */}
      <Text style={[styles.total, { color: colors.text }]}>
        Total: {money(total)}
      </Text>

      {/* Botones de acción */}
      <View style={styles.buttonGroup}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button
            title="Agregar al carrito"
            color={colors.primary}
            onPress={handleAddToCart}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Comprar ahora"
            color={colors.secondary || "#4CAF50"}
            onPress={handleBuyNow}
          />
        </View>
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
  },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  price: { fontSize: 16, marginBottom: 12 },

  description: { fontSize: 16, lineHeight: 22, marginBottom: 16 },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  qtyText: { fontSize: 18, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
