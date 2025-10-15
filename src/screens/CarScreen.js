import { View, Text, StyleSheet, FlatList, Button, Image, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";

export default function Car() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // ✅ Calcular total general
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Función para simular la compra
  const handlePurchase = () => {
    Alert.alert(
      "Compra realizada 🎉",
      `Gracias por tu compra. El total fue de ${money(total)}.`,
      [
        { text: "Aceptar", onPress: () => clearCart() }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>🛒 Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {money(item.price)} × {item.qty}
              </Text>
              <Text style={styles.subtotal}>
                Subtotal: {money(item.price * item.qty)}
              </Text>
              <Button
                title="Eliminar"
                color="#E91E63"
                onPress={() => removeFromCart(item.id)}
              />
            </View>
          </View>
        )}
      />

      {/* ✅ Total y botones de acción */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {money(total)}</Text>
        <Button title="Comprar" color="#4CAF50" onPress={handlePurchase} />
        <View style={{ marginTop: 8 }}>
          <Button title="Vaciar carrito" color="#E91E63" onPress={clearCart} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#555" },
  subtotal: { fontWeight: "600", marginVertical: 4 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, color: "#999" },
  footer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
});
