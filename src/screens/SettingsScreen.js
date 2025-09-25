import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import { useUi } from "../context/UiContext";

const BAR_HEIGHT = 56; // altura visual estimada

export default function SettingsScreen() {
  // Estado global de UI (tema y escala de fuente)
  const { theme, setTheme, fontScale, setFontScale } = useUi();

  // Inset superior para respetar notch / status bar
  const insets = useSafeAreaInsets();
  const spacer = insets.top + BAR_HEIGHT;

  // Paleta por tema (dark/light). Solo cambia colores; la estructura es la misma.
  const isDark = theme === "dark";
  const colors = isDark
    ? { bg: "#111", card: "#1b1b1b", text: "#fff", sub: "#aaa", primary: "#E91E63" }
    : { bg: "#fff", card: "#f7f7f7", text: "#222", sub: "#666", primary: "#E91E63" };

  // Helpers para ajustar la escala de fuentes con límites
  const inc = () => setFontScale(s => Math.min(1.5, +(s + 0.1).toFixed(2)));
  const dec = () => setFontScale(s => Math.max(0.9, +(s - 0.1).toFixed(2)));

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Barra superior */}
      <NavBar showBack />
      {/* Espaciador para que el contenido no quede bajo la barra */}
      <View style={{ height: spacer }} />

      {/* Sección: Apariencia (tema claro/oscuro) */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Apariencia</Text>

        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Tema oscuro</Text>
            <Text style={[styles.sublabel, { color: colors.sub }]}>
              Cambia entre claro y oscuro
            </Text>
          </View>

          {/* Interruptor del tema */}
          <Switch
            value={isDark}
            onValueChange={(v) => setTheme(v ? "dark" : "light")}
            thumbColor={isDark ? "#fff" : "#fff"}
            trackColor={{ false: "#aaa", true: colors.primary }}
          />
        </View>
      </View>

      {/* Sección: Tamaño de texto (escala tipográfica) */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Tamaño de texto</Text>

        {/* Controles A-/A+ con indicador actual */}
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

        {/* Vista previa con la escala aplicada */}
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
  // Contenedor base
  container: { flex: 1 },

  // Tarjetas/secciones de ajustes
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },

  // Títulos y textos base
  title: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { fontSize: 16, fontWeight: "600" },
  sublabel: { fontSize: 13, marginTop: 2 },

  // Botones A-/A+
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 2,
  },
  btnText: { fontSize: 16, fontWeight: "800" },
  scaleText: { fontSize: 16, fontWeight: "700" },

  // Caja de vista previa
  preview: {
    marginTop: 14,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
  },
  previewTitle: { fontWeight: "800", marginBottom: 6 },
  previewBody: { lineHeight: 20 },
});


