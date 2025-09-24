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



export default function ProductListScreen({ navigation }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return PRODUCTS;
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(t));
  }, [q]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      style={styles.card}
    >
      <Image source={item.image} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
        <Text style={styles.cardLink}>Ver detalle</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      {/* Navbar fijo */}
      <NavBar />

      {/* Header con fondo + overlay fucsia */}
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text style={styles.headerTitle}>Productos</Text>
      </ImageBackground>

      <View style={styles.content}>
        <TextInput
          placeholder="Buscar producto..."
          placeholderTextColor="#777"
          value={q}
          onChangeText={setQ}
          style={styles.search}
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
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "800", padding: 16 },

  content: { flex: 1, padding: 16, gap: 12 },
  search: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  thumb: { width: 70, height: 70, borderRadius: 12, resizeMode: "cover" },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: "#333" },
  cardPrice: { marginTop: 2, color: "#444" },
  cardLink: { marginTop: 6, textDecorationLine: "underline", color: "#E91E63", fontWeight: "600" },
});


