import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";

export default function usePushNotifications() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  async function registerForPushNotifications() {
    if (!Device.isDevice) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Los permisos de notificación fueron denegados.");
      return;
    }

    // 🟢 OBTENER TOKEN FCM REAL
    const token = await Notifications.getDevicePushTokenAsync();

    console.log("🔥 TOKEN FCM REAL:", token.data);

    setFcmToken(token.data);

    return token.data;
  }

  return fcmToken;
}
