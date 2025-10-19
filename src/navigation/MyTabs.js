import { StatusBar } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useUi } from "../context/UiContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
      screenOptions={{tabBarActiveTintColor: '#e91e63',
      tabBarLabelStyle: { fontSize: 15}
    }}>

      <Tab.Screen name="ProductList" 
      component={ProductListScreen} 
      options={{ headerShown: false, 
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" size={30} color={color} />),
      }}/>

      <Tab.Screen name="Car" component={Car}
        options={{headerShown: false,
        tabBarLabel: 'Carrito',
        tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="cart" size={30} color={color} />)
      }} />

      <Tab.Screen name="Explore" component={ExploreScreen}
        options={{ headerShown: false,
        tabBarLabel: 'Explorar',
        tabBarIcon: ({ color }) => (<MaterialIcons name="search" size={30} color={color} />)
        }} />

    <Tab.Screen name="Settings" component={SettingsScreen} 
      options={{ headerShown: false,
        tabBarLabel: 'Ajustes',
        tabBarIcon: ({ color }) => (<MaterialIcons name="settings" size={30} color={color} />)
      }} />

    
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
