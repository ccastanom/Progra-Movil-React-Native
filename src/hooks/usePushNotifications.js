import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import * as Device from "expo-device";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  async function registerForPushNotifications() {
    if (!Device.isDevice) return;

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Los permisos de notificación fueron denegados.");
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "TU_PROJECT_ID_DE_EXPO",
    });

    setExpoPushToken(token.data);
  }

  return expoPushToken;
}
