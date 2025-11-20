import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UiProvider } from "./src/context/UiContext";
import MainNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { LogBox, Alert, Platform, Text } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Font from "expo-font";

import usePushNotifications from "./src/hooks/usePushNotifications"; 

// Ocultar logs
LogBox.ignoreAllLogs(true);
console.log = () => {};
console.warn = () => {};
console.error = () => {};

// NOTIFICATION HANDLER 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Pedir permisos
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

  const expoPushToken = usePushNotifications();

  useEffect(() => {
    if (expoPushToken) {
      console.log("TOKEN FCM / EXPO:", expoPushToken);
      // TODO: GUARDARLO EN FIRESTORE O EN TU API
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
      Text.defaultProps.style = {
        fontFamily: "BalooRegular",
      };

      const oldRender = Text.render;
      Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
          style: [
            { fontFamily: "BalooRegular" },
            origin.props.style,
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
