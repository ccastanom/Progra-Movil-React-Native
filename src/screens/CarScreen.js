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

  // Calcular total
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <NavBar showBack={true} />

        <View style={styles.emptyWrap}>
          <Text
            style={[
              styles.empty,
              { color: colors.subtext, fontSize: 18 * fontScale },
            ]}
          >
            Tu carrito está vacío
          </Text>
        </View>
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
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View
                style={[
                  styles.image,
                  {
                    backgroundColor: colors.border,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={{ color: colors.subtext, fontSize: 12 }}>
                  Sin imagen
                </Text>
              </View>
            )}

            {/* Info */}
            <View style={styles.info}>
              <Text
                style={[
                  styles.name,
                  { color: colors.text, fontSize: 16 * fontScale },
                ]}
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

      <View
        style={[
          styles.totalContainer,
          { backgroundColor: colors.bg, borderTopColor: colors.border },
        ]}
      >
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
          <Text style={styles.buyText}>Finalizar compra</Text>
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

  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontWeight: "500",
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  info: { flex: 1 },

  name: {
    fontWeight: "700",
    marginBottom: 2,
  },

  price: {},
  quantity: {},
  subtotal: {
    marginTop: 4,
    fontWeight: "700",
  },

  remove: {
    marginTop: 6,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  totalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 25,
    borderTopWidth: 1,
    alignItems: "center",
    gap: 10,
  },

  totalText: {
    fontWeight: "700",
    marginBottom: 4,
  },

  buyButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },

  buyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  clearButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },

  clearText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
