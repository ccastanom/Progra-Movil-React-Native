import { StatusBar } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useUi } from "../context/UiContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pantallas
import SettingsScreen from "../screens/SettingsScreen";
import Car from "../screens/CarScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ExploreScreen from "../screens/ExploreScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E91E63",
        tabBarInactiveTintColor: "#B5B5B5",
        tabBarStyle: {
          height: 62,
          paddingTop: 4,
          paddingBottom: 6,
          backgroundColor: "#fff",
          borderTopWidth: 0.8,
          borderTopColor: "#eeeeee",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "BalooMedium", // ya la tienes cargada en App.js
        },
      }}
    >
      <Tab.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explorar",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Car"
        component={Car}
        options={{
          tabBarLabel: "Carrito",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const { theme } = useUi();
  const MyTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#000" : "#fff"}
      />

      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
