import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import { PRODUCTS } from "../utils/products";
import { useUi } from "../context/UiContext";

export default function SearchScreen({ navigation }) {
  const { theme, fontScale } = useUi();
  const dark = theme === "dark";
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(t));
  }, [q]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      style={[
        styles.card,
        {
          backgroundColor: dark ? "#1E1E1E" : "#fff",
          borderColor: dark ? "#2a2a2a" : "#eee",
        },
      ]}
    >
      <Image source={item.image} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.cardTitle,
            { color: dark ? "#fff" : "#222", fontSize: 15 * fontScale },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.cardPrice,
            { color: dark ? "#bbb" : "#444", fontSize: 13 * fontScale },
          ]}
        >
          ${item.price.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.cardLink,
            { color: dark ? "#FF4081" : "#E91E63", fontSize: 13 * fontScale },
          ]}
        >
          Ver detalle
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: dark ? "#121212" : "#fafafa" }}>
      {/* <NavBar /> */}

      {/* Campo de búsqueda arriba */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: dark ? "#1E1E1E" : "#fff",
              borderColor: dark ? "#333" : "#ddd",
            },
          ]}
        >
          <Ionicons
            name="search"
            size={22}
            color={dark ? "#aaa" : "#666"}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Buscar productos..."
            placeholderTextColor={dark ? "#777" : "#888"}
            value={q}
            onChangeText={setQ}
            style={[
              styles.searchInput,
              { color: dark ? "#fff" : "#000", fontSize: 17 * fontScale },
            ]}
          />
        </View>
      </View>

      {/* Lista de productos */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingTop: 0, paddingBottom: 60 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: dark ? "#999" : "#555",
              marginTop: 60,
              fontSize: 16 * fontScale,
            }}
          >
            No se encontraron productos.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "cover",
  },
  cardTitle: {
    fontWeight: "700",
  },
  cardPrice: {
    marginTop: 4,
  },
  cardLink: {
    marginTop: 6,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
