import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../../assets/SvgIcon";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Platform } from "react-native";
export default function NavBar({ showBack = false, hideMenu = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>

      <View style={styles.logoWrap}>
        <SvgIcon width={40} height={40} />
      </View>

      <Text style={styles.brand}>QUE ROLLO</Text>

      {showBack && (

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.menuIcon}>←</Text>
          </TouchableOpacity>)}
    </View>
  );
}

// Barra fija y semitransparente sobre el contenido
const styles = StyleSheet.create({
  navBar: {
    height: 75,
    backgroundColor: "#ffffffcc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logoWrap: { justifyContent: "center", alignItems: "center" },
  brand: {
    fontSize: 24,
    fontWeight: "900",
    color: "#E91E63",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  menuIcon: { fontSize: 28, color: "#E91E63" },
});