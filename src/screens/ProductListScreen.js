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
} from "react-native";
import NavBar from "../components/NavBar";
import { PRODUCTS } from "../utils/products";
import { useUi } from "../context/UiContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24; // dos tarjetas por fila con márgenes

export default function RecommendedProducts({ navigation }) {
  const { theme, fontScale } = useUi();
  const dark = theme === "dark";

  const [recommended, setRecommended] = useState([]);

  // Mezclar productos al montar
  useEffect(() => {
    const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
    setRecommended(shuffled);
  }, []);

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
      <Text
        style={[
          styles.cardTitle,
          { color: dark ? "#fff" : "#333", fontSize: 14 * fontScale },
        ]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.cardPrice,
          { color: dark ? "#ccc" : "#444", fontSize: 13 * fontScale },
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
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? "#121212" : "#fafafa",
      }}
    >
      <NavBar />

      {/* Encabezado con imagen */}
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover", opacity: dark ? 0.4 : 1 }}
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

      {/* Lista de productos en cuadrícula */}
      <FlatList
  data={recommended}
  key={"grid"}
  keyExtractor={(item) => item.id.toString()}
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
