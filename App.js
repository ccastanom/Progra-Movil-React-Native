import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import MainNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { LogBox, Platform, Text } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

import * as Notifications from "expo-notifications";
import * as Font from "expo-font";
import usePushNotifications from "./src/hooks/usePushNotifications";

// Ocultar logs
LogBox.ignoreAllLogs(true);

// NOTIFICATION HANDLER
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const expoPushToken = usePushNotifications();

  useEffect(() => {
    if (expoPushToken) {
      console.log("TOKEN FCM/EXPO:", expoPushToken);
    }
  }, [expoPushToken]);

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

      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: "BalooRegular" };

      const oldRender = Text.render;
      Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
          style: [{ fontFamily: "BalooRegular" }, origin.props.style],
        });
      };

      // Canal Android necesario para FCM
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      setFontsLoaded(true);
    }

    loadFonts();
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
