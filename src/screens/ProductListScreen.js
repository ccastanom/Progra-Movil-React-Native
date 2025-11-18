// src/screens/ProductListScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import NavBar from "../components/NavBar";
import useThemeColors from "../styles/themes";
import { useUi } from "../context/UiContext";
import { FontFamily as fonts } from "../styles/fonts";

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

        // Mezclar los productos aleatoriamente y tomar 4
        const randomProducts = list.sort(() => Math.random() - 0.5).slice(0, 4);

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
        <Image
          source={{ uri: item.image || item.imageUrl }}
          style={styles.thumb}
        />
      ) : (
        <View
          style={[
            styles.thumb,
            { backgroundColor: colors.border, justifyContent: "center" },
          ]}
        >
          <Text
            style={{
              color: colors.subtext,
              textAlign: "center",
              fontFamily: fonts.regular,
              fontSize: 14 * fontScale,
            }}
          >
            Sin imagen
          </Text>
        </View>
      )}

      {/* Nombre del producto */}
      <Text
        style={[
          styles.cardTitle,
          { color: colors.text, fontSize: 18 * fontScale },
        ]}
        numberOfLines={1}
      >
        {item.name || "Producto"}
      </Text>

      {/* Precio */}
      <Text
        style={[
          styles.cardPrice,
          { color: colors.subtext, fontSize: 16 * fontScale },
        ]}
      >
        ${item.price?.toLocaleString() || "0"}
      </Text>

      {/* Ver detalle */}
      <Text
        style={[
          styles.cardLink,
          { color: colors.primary, fontSize: 16 * fontScale },
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
        <Text
          style={{
            color: colors.subtext,
            marginTop: 10,
            fontFamily: fonts.regular,
            fontSize: 10 * fontScale,
          }}
        >
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
  headerTitle: {
    padding: 16,
    fontFamily: fonts.extrabold,

  },

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
    textAlign: "center",
    fontFamily: fonts.bold,
  },
  cardPrice: {
    marginTop: 2,
    fontFamily: fonts.medium,
  },
  cardLink: {
    marginTop: 4,
    textDecorationLine: "underline",
    fontFamily: fonts.semibold,
  },
});

