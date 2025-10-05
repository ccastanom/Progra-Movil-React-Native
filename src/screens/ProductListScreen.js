import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import NavBar from "../components/NavBar";
import { PRODUCTS } from "../utils/products";
import { useUi } from "../context/UiContext";

export default function ProductListScreen({ navigation }) {
  const { theme } = useUi();
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
          borderColor: dark ? "#333" : "#e3e3e3",
        },
      ]}
    >
      <Image source={item.image} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitle, { color: dark ? "#fff" : "#333" }]}>
          {item.name}
        </Text>
        <Text style={[styles.cardPrice, { color: dark ? "#ccc" : "#444" }]}>
          ${item.price.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.cardLink,
            { color: dark ? "#FF4081" : "#E91E63" },
          ]}
        >
          Ver detalle
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? "#121212" : "#fafafa",
      }}
    >
      {/* Navbar fijo */}
      <NavBar />

      {/* Header con fondo + overlay */}
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover", opacity: dark ? 0.4 : 1 }}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: dark ? "#fff" : "#fff" },
          ]}
        >
          Productos
        </Text>
      </ImageBackground>

      {/* Contenido: buscador + listado */}
      <View style={styles.content}>
        <TextInput
          placeholder="Buscar producto..."
          placeholderTextColor={dark ? "#aaa" : "#777"}
          value={q}
          onChangeText={setQ}
          style={[
            styles.search,
            {
              backgroundColor: dark ? "#222" : "#fff",
              borderColor: dark ? "#333" : "#e3e3e3",
              color: dark ? "#fff" : "#000",
            },
          ]}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: { height: 160, justifyContent: "flex-end" },
  headerTitle: { fontSize: 28, fontWeight: "800", padding: 16 },
  content: { flex: 1, padding: 16, gap: 12 },
  search: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  thumb: { width: 70, height: 70, borderRadius: 12, resizeMode: "cover" },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardPrice: { marginTop: 2 },
  cardLink: {
    marginTop: 6,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
