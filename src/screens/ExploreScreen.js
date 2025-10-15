import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
export default function ExploreScreen() {
    return (
        <View>
            <NavBar />
            <View> 
                <Text style={styles.dramaticText}>Nothin see here...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dramaticText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E91E63",
        textShadowColor: "rgba(0,0,0,0.5)",
        
    },
});