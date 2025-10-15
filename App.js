import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext"; // Context global (tema, tamaño de texto)
import MainNavigator from "./src/navigation/AppNavigator"; // Navegación principal
import { CartProvider } from "./src/context/CartContext"; // Contexto del carrito de compras

const Stack = createNativeStackNavigator(); // Stack nativo

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
