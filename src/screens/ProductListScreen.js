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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: "#000",
          borderColor: colors.border,
        },
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
          { color: colors.text, fontSize: 16 * fontScale },
        ]}
        numberOfLines={1}
      >
        {item.name || "Producto"}
      </Text>

      {/* Precio */}
      <Text
        style={[
          styles.cardPrice,
          { color: colors.subtext, fontSize: 14 * fontScale },
        ]}
      >
        ${item.price?.toLocaleString() || "0"}
      </Text>

      {/* Ver detalle */}
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
      {/* HEADER LIMPIO */}
      <View style={[styles.header, { backgroundColor: colors.bg }]}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 22 * fontScale,
            fontFamily: "CrystalTitle", // Crystal Radio Kit
            letterSpacing: 1,
          }}
        >
          QUE ROLLO
        </Text>

        <Text
          style={[
            styles.headerTitle,
            { color: colors.text, fontSize: 18 * fontScale },
          ]}
        >
          Recomendados para ti
        </Text>

        <Text
          style={[
            styles.headerSubtitle,
            { color: colors.subtext, fontSize: 13 * fontScale },
          ]}
        >
          Selección dulce pensada para tus antojos del día de hoy
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 4,
  },
  headerTitle: {
    marginTop: 6,
    fontFamily: fonts.bold,
  },
  headerSubtitle: {
    marginTop: 4,
    fontFamily: fonts.regular,
    lineHeight: 18,
  },

  /* CARD */
  card: {
    width: CARD_WIDTH,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 1.5,
  },
  thumb: {
    width: "100%",
    height: CARD_WIDTH - 28,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 10,
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
    marginTop: 6,
    textDecorationLine: "underline",
    fontFamily: fonts.semibold,
  },
});
