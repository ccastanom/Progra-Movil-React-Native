import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUi } from "../context/UiContext";
// Pantallas
import LoginScreen from "../screens/LoginScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import MyTabs from "./MyTabs";
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { theme } = useUi();

  const MyTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#000" : "#fff"}
      />

      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Principal"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerBackButtonDisplayMode: "minimal",
              title: "Product Details",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
