import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SvgIcon from "../../assets/SvgIcon";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <View style={styles.logoWrap}>
          <SvgIcon width={40} height={40} />
        </View>
        <Text style={styles.brand}>QUE ROLLO</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Imagen de fondo con frase */}
      <ImageBackground
        source={require("../../assets/fondo.jpeg")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerText}>
            El rollo perfecto para cada antojo 😋
          </Text>
        </View>
      </ImageBackground>

      {/* Botón continuar */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <View style={styles.imgEnd}>
          <SvgIcon width={300} height={300} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImage: {
    width: "105%",
    height: 400,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerTextWrap: {
    backgroundColor: "rgba(0,0,0,0.4)", // fondo oscuro transparente
    padding: 12,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  content: { flex: 1, alignItems: "center", padding: 20 },
  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  imgEnd: { opacity: 0.5, marginTop: 30 },
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
  brand: { fontSize: 18, fontWeight: "800", color: "#E91E63" },
  menuIcon: { fontSize: 28, color: "#E91E63" },
});

