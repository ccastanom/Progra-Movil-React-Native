import { View, Text, StyleSheet } from "react-native";

export default function Car() {
    return (
        <View>
            <Text style={styles.dramaticText}>Nothin see here...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    dramaticText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E91E63",
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        textAlign: "center",
        alignSelf: "center",
        backgroundColor: "#333",
        borderRadius: 16,
        padding: 16,
    },
});
