import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import { useNavigation } from "@react-navigation/native";
import useThemeColors from "../styles/themes";
import { FontFamily as fonts } from "../styles/fonts";

export default function NavBar({ showBack = false, hideMenu = false, title }) {
  const navigation = useNavigation();
  const { colors } = useThemeColors();

  return (
    <View style={[styles.navBar, { backgroundColor: colors.bg }]}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.menuIcon, { color: colors.primary }]}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text
        style={[
          styles.brand,
          {
            color: colors.primary,
          },
        ]}
      >
        {title || "QUE ROLLO"}
      </Text>

      {hideMenu ? (
        <View style={styles.logoPlaceholder} />
      ) : (
        <View style={styles.logoWrap}>
          <SvgIcon width={32} height={32} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
  backPlaceholder: {
    width: 32,
  },
  logoWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
  logoPlaceholder: {
    width: 32,
  },
  brand: {
    fontSize: 20,
    fontFamily: "CrystalTitle",
    letterSpacing: 1,
  },
  menuIcon: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
});
