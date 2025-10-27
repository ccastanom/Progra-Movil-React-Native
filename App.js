import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import MainNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { LogBox } from "react-native"; 

// LogBox.ignoreAllLogs(true);
// console.log = () => {};
// console.warn = () => {};
// //console.error = () => {};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <UiProvider>
          <MainNavigator />
        </UiProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}
