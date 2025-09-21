import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import NavBar from "../components/NavBar";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params; // { id, name, price, image }
  const [qty, setQty] = useState(1);

  const total = product.price * qty;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Navbar fijo arriba */}
      <NavBar />

      {/* Header con imagen del producto + overlay fucsia */}
      <ImageBackground
        source={product.image}
        style={styles.heroImage}
        imageStyle={{ borderRadius: 16, resizeMode: "cover" }}
      >
        <View style={styles.overlay} />
        <Text style={styles.title}>{product.name}</Text>
      </ImageBackground>

      {/* Precio */}
      <Text style={styles.price}>Precio: ${product.price.toLocaleString()}</Text>

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
  heroImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(233, 30, 99, 0.5)", // fucsia semitransparente
    borderRadius: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", padding: 16 },
  price: { fontSize: 16, marginBottom: 16, color: "#444" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 },
  qtyText: { fontSize: 18, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "#000" },
});


