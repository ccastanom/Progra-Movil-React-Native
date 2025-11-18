import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import MainNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { LogBox, Alert, Platform, Text } from "react-native";
import { useEffect, useState } from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Font from "expo-font";

LogBox.ignoreAllLogs(true);
console.log = () => {};
console.warn = () => {};
console.error = () => {};

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
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Alert", "No se otorgaron permisos para notificaciones.");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BalooRegular: require("./assets/fonts/Baloo2-Regular.ttf"),
        BalooMedium: require("./assets/fonts/Baloo2-Medium.ttf"),
        BalooSemi: require("./assets/fonts/Baloo2-SemiBold.ttf"),
        BalooBold: require("./assets/fonts/Baloo2-Bold.ttf"),
        BalooExtra: require("./assets/fonts/Baloo2-ExtraBold.ttf"),
        CrystalTitle: require("./assets/fonts/Crystal Radio Kit.otf"),
      });

      //  Fuente global
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = {
        fontFamily: "BalooRegular",
      };

      const oldRender = Text.render;
      Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
          style: [
            { fontFamily: "BalooRegular"}, // defecto
            origin.props.style, // respeta la personalizacion
          ],
        });
      };

      setFontsLoaded(true);
    }

    loadFonts();
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) return null;

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

