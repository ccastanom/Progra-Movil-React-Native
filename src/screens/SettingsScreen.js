import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { useUi } from "../context/UiContext";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const BAR_HEIGHT = 56;

export default function SettingsScreen() {
  const { theme, setTheme, fontScale, setFontScale } = useUi();
  const insets = useSafeAreaInsets();
  const spacer = insets.top + BAR_HEIGHT;
  const navigation = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  // Paleta por tema
  const isDark = theme === "dark";
  const colors = isDark
    ? { bg: "#111", card: "#1b1b1b", text: "#fff", sub: "#aaa", primary: "#E91E63" }
    : { bg: "#fff", card: "#f7f7f7", text: "#222", sub: "#666", primary: "#E91E63" };

  // Escala de fuente
  const inc = () => setFontScale((s) => Math.min(1.5, +(s + 0.1).toFixed(2)));
  const dec = () => setFontScale((s) => Math.max(0.9, +(s - 0.1).toFixed(2)));

  // Obtener datos del perfil
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setUserData(snap.data());
      } catch (e) {
        console.error("Error al obtener datos del usuario:", e);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar sesión correctamente.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <NavBar showBack />
      <View style={{ height: spacer }} />

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Perfil</Text>

        {userData ? (
          <View style={styles.profile}>
            <Image
              source={{
                uri:
                  userData.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={styles.avatar}
            />
            <Text style={[styles.name, { color: colors.text }]}>
              {userData.name || "Usuario sin nombre"}
            </Text>
            <Text style={[styles.email, { color: colors.sub }]}>
              {userData.email}
            </Text>
            <Text style={[styles.uid, { color: colors.sub }]}>
              ID: {user?.uid}
            </Text>
          </View>
        ) : (
          <Text style={[{ color: colors.sub }]}>
            Cargando información del perfil...
          </Text>
        )}

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.primary }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Apariencia</Text>

        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Tema oscuro</Text>
            <Text style={[styles.sublabel, { color: colors.sub }]}>
              Cambia entre claro y oscuro
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={(v) => setTheme(v ? "dark" : "light")}
            thumbColor={"#fff"}
            trackColor={{ false: "#aaa", true: colors.primary }}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Tamaño de texto</Text>

        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TouchableOpacity style={[styles.btn, { borderColor: colors.primary }]} onPress={dec}>
            <Text style={[styles.btnText, { color: colors.primary }]}>A-</Text>
          </TouchableOpacity>

          <Text style={[styles.scaleText, { color: colors.text }]}>
            {Math.round(fontScale * 100)}%
          </Text>

          <TouchableOpacity style={[styles.btn, { borderColor: colors.primary }]} onPress={inc}>
            <Text style={[styles.btnText, { color: colors.primary }]}>A+</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.preview, { borderColor: colors.primary }]}>
          <Text style={[styles.previewTitle, { color: colors.text, fontSize: 20 * fontScale }]}>
            Vista previa
          </Text>
          <Text style={[styles.previewBody, { color: colors.sub, fontSize: 14 * fontScale }]}>
            Así se verá el texto en la app con este tamaño.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { fontSize: 16, fontWeight: "600" },
  sublabel: { fontSize: 13, marginTop: 2 },

  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 2,
  },
  btnText: { fontSize: 16, fontWeight: "800" },
  scaleText: { fontSize: 16, fontWeight: "700" },

  preview: {
    marginTop: 14,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
  },
  previewTitle: { fontWeight: "800", marginBottom: 6 },
  previewBody: { lineHeight: 20 },

  profile: { alignItems: "center" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "700" },
  email: { fontSize: 14 },
  uid: { fontSize: 12, marginTop: 4 },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
