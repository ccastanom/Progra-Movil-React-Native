import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useUi } from "../context/UiContext";
import useThemeColors from "../styles/themes";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";

export default function Car() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation();
  const { fontScale } = useUi();
  const { colors } = useThemeColors();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text
          style={[
            styles.empty,
            { color: colors.subtext, fontSize: 18 * fontScale },
          ]}
        >
          Tu carrito está vacío
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <NavBar showBack={true} />

      <FlatList
        style={{ marginTop: 80 }}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {/* Imagen */}
            {item.image ? (
              <Image
              source={{ uri: item.image }}
              style={styles.image}
              />
            ) : (
              <View
                style={[
                  styles.image,
                  { backgroundColor: colors.border, justifyContent: "center", alignItems: "center" },
                ]}
                >
                <Text style={{ color: colors.subtext, fontSize: 12 }}>Sin imagen</Text>
              </View>
            )}


            <View style={styles.info}>
              <Text
                style={[styles.name, { color: colors.text, fontSize: 16 * fontScale }]}
              >
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.subtext }]}>
                Precio: {money(item.price)}
              </Text>
              <Text style={[styles.quantity, { color: colors.subtext }]}>
                Cantidad: {item.quantity || 1}
              </Text>
              <Text style={[styles.subtotal, { color: colors.text }]}>
                Subtotal: {money(item.price * (item.quantity || 1))}
              </Text>

              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={[styles.remove, { color: "#E91E63" }]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text
          style={[
            styles.totalText,
            { color: colors.text, fontSize: 22 * fontScale },
          ]}
        >
          Total a pagar: {money(total)}
        </Text>

        <TouchableOpacity
          style={[styles.buyButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Checkout", { total })}
        >
          <Text style={[styles.buyText, { fontSize: 16 * fontScale }]}>
            Finalizar compra
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.clearButton,
            { borderColor: colors.primary, borderWidth: 1 },
          ]}
          onPress={clearCart}
        >
          <Text style={[styles.clearText, { color: colors.primary }]}>
            Vaciar carrito
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "bold" },
  price: { marginTop: 4 },
  quantity: { marginTop: 2 },
  subtotal: { marginTop: 4, fontWeight: "bold" },
  remove: { marginTop: 8 },
  empty: { textAlign: "center", marginTop: 50 },
  totalContainer: { marginTop: 20, alignItems: "center" },
  totalText: { fontWeight: "bold", marginBottom: 10 },
  buyButton: {
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buyText: { color: "#fff", fontWeight: "bold" },
  clearButton: {
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  clearText: { fontWeight: "bold" },
});
