import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, ActivityIndicator,} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import NavBar from "../components/NavBar";
import useThemeColors from "../styles/Themes";
import { useUi } from "../context/UiContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

export default function ProductListScreen({ navigation }) {
  const { fontScale } = useUi();
  const { colors } = useThemeColors();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productos = await getDocs(collection(db, "productos"));
        const list = productos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Mezclar los productos aleatoriamente
        const randomProducts = list
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setProducts(randomProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Renderizar cada tarjeta de producto
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {item.image || item.imageUrl ? (
        <Image source={{ uri: item.image || item.imageUrl }} style={styles.thumb} />
      ) : (
        <View
          style={[
            styles.thumb,
            { backgroundColor: colors.border, justifyContent: "center" },
          ]}
        >
          <Text style={{ color: colors.subtext, textAlign: "center" }}>
            Sin imagen
          </Text>
        </View>
      )}

      <Text
        style={[
          styles.cardTitle,
          { color: colors.text, fontSize: 14 * fontScale },
        ]}
        numberOfLines={1}
      >
        {item.name || "Producto"}
      </Text>
      <Text
        style={[
          styles.cardPrice,
          { color: colors.subtext, fontSize: 13 * fontScale },
        ]}
      >
        ${item.price?.toLocaleString() || "0"}
      </Text>
      <Text
        style={[
          styles.cardLink,
          { color: colors.primary, fontSize: 13 * fontScale },
        ]}
      >
        Ver detalle
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.subtext, marginTop: 10 }}>
          Cargando productos...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NavBar />

      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover", opacity: 0.4 }}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: "#fff", fontSize: 28 * fontScale },
          ]}
        >
          Recomendados para ti
        </Text>
      </ImageBackground>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: { height: 150, justifyContent: "flex-end" },
  headerTitle: { fontWeight: "800", padding: 16 },

  card: {
    width: CARD_WIDTH,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  thumb: {
    width: "100%",
    height: CARD_WIDTH - 40,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  cardPrice: {
    marginTop: 2,
  },
  cardLink: {
    marginTop: 4,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
