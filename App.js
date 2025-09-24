// Punto de entrada de la app: SafeArea + Provider + Navigation.
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext"; // Context global (tema, tamaño de texto)

// Pantallas principales
import SettingsScreen from "./src/screens/SettingsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";

const Stack = createNativeStackNavigator(); // Stack nativo

export default function App() {
  return (
    <SafeAreaProvider>
      <UiProvider>

        {/*  NAVEGACIÓN:
            NavigationContainer es el contenedor que habilita React Navigation
            en toda la app. Todo lo que sea navegación va dentro de él. */}
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          {/*  STACK.NAVIGATOR
              Define el “navegador” tipo pila (push/pop).
              - initialRouteName: pantalla inicial.
              - screenOptions: opciones globales para todas las rutas del stack.*/}
          <Stack.Navigator initialRouteName="Login">
            {/*SCREENS: Cada <Stack.Screen> registra una pantalla/ruta.
                - name: nombre de la ruta para navigation.navigate("name")
                - component: el componente que se renderiza*/}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Inicio de sesión" }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ title: "Productos" }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Detalle del producto" }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Ajustes" }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </UiProvider> 
    </SafeAreaProvider>
  );
}

