// App.js
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Si instalaste safe-area-context, puedes usar su provider (opcional)
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import SettingsScreen from "./src/screens/SettingsScreen";


import LoginScreen from "./src/screens/LoginScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <UiProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Stack.Navigator initialRouteName="Login">
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

