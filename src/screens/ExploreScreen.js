import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import { useUi } from "../context/UiContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import useThemeColors from "../styles/themes";
import { FontFamily as fonts } from "../styles/fonts";

export default function ExploreScreen({ navigation }) {
  const { theme, fontScale } = useUi();
  const { colors } = useThemeColors();
  const dark = theme === "dark";
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Cargar productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products;
    return products.filter((p) => p.name?.toLowerCase().includes(t));
  }, [q, products]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: "#000",
        },
      ]}
    >
      <Image
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
            : require("../../assets/no-image.png")
        }
        style={styles.thumb}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.cardTitle,
            { color: colors.text, fontSize: 15 * fontScale },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.cardPrice,
            { color: colors.subtext, fontSize: 13 * fontScale },
          ]}
        >
          ${item.price?.toLocaleString() || 0}
        </Text>
        <Text
          style={[
            styles.cardLink,
            { color: colors.primary, fontSize: 13 * fontScale },
          ]}
        >
          Ver detalle
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text
          style={{
            color: colors.subtext,
            marginTop: 8,
            fontFamily: fonts.regular,
            fontSize: 12 * fontScale,
          }}
        >
          Cargando productos...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* NavBar con flecha de regreso */}
      <NavBar showBack={true} />

      {/* Contenido debajo del NavBar */}
      <View style={styles.screenContent}>
        {/* Header de sección */}
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: 20 * fontScale },
            ]}
          >
            Explorar
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.subtext, fontSize: 13 * fontScale },
            ]}
          >
            Encuentra tu rollo favorito por nombre o sabor
          </Text>
        </View>

        {/* Campo de búsqueda */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: "#000",
              },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={colors.subtext}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Buscar productos..."
              placeholderTextColor={colors.subtext}
              value={q}
              onChangeText={setQ}
              style={[
                styles.searchInput,
                {
                  color: colors.text,
                  fontSize: 16 * fontScale,
                },
              ]}
            />
          </View>
        </View>

        {/* Lista de productos */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 60,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                color: colors.subtext,
                marginTop: 60,
                fontSize: 16 * fontScale,
                fontFamily: fonts.regular,
              }}
            >
              No se encontraron productos.
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // todo lo que va debajo del NavBar
  screenContent: {
    flex: 1,
    paddingTop: 80, // deja espacio bajo el NavBar
  },

  header: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.bold,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.regular,
    lineHeight: 18,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.medium,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 16,
    gap: 12,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1.5,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 14,
    resizeMode: "cover",
  },
  cardTitle: {
    fontFamily: fonts.bold,
  },
  cardPrice: {
    marginTop: 4,
    fontFamily: fonts.medium,
  },
  cardLink: {
    marginTop: 6,
    textDecorationLine: "underline",
    fontFamily: fonts.semibold,
  },
});
