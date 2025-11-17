import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import MainNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { LogBox, Alert, Platform } from "react-native"; 
import { useEffect } from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

LogBox.ignoreAllLogs(true);
console.log = () => {};
console.warn = () => {};
console.error = () => {};

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,    
    shouldShowBanner: true,     
    shouldShowList: true,       
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Alert",
      "No se otorgaron permisos para notificaciones."
    );
    return;
  }

  // en otro push real se usa el token
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
