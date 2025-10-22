import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";

export default function Car() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Tu carrito está vacío 🛒</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar showBack={true} />
      <FlatList
        style={{ marginTop: 80 }}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Precio: {money(item.price)}</Text>
              <Text style={styles.quantity}>
                Cantidad: {item.quantity || 1}
              </Text>
              <Text style={styles.subtotal}>
                Subtotal: {money(item.price * (item.quantity || 1))}
              </Text>

              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.remove}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total a pagar: {money(total)}</Text>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate("Checkout", { total })}
        >
          <Text style={styles.buyText}>Finalizar compra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearText}>Vaciar carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  name: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  price: { color: "#ccc", marginTop: 4 },
  quantity: { color: "#ccc", marginTop: 2 },
  subtotal: { color: "#fff", marginTop: 4, fontWeight: "bold" },
  remove: { color: "#ff4d4d", marginTop: 8 },
  empty: { color: "#ccc", textAlign: "center", marginTop: 50, fontSize: 18 },
  totalContainer: { marginTop: 20, alignItems: "center" },
  totalText: { color: "#fff", fontSize: 22, marginBottom: 10 },
  buyButton: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  clearButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  clearText: { color: "#fff", fontSize: 15 },
});
