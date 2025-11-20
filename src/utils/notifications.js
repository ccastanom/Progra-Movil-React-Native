import * as Notifications from "expo-notifications";

export async function sendWelcomeNotification(name = "Que Rollo") {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bienvenido a Que Rollo ❤️",
      body: `Inicio de sesión exitoso${name ? `, ${name}` : ""}`,
      sound: "default",
    },
    trigger: { seconds: 10 },
  });
}

export async function sendOrderConfirmedNotification(total) {
  const body =
    typeof total === "number"
      ? `Gracias por tu compra en Que Rollo. Total: $${total.toLocaleString()}`
      : "Gracias por tu compra en Que Rollo 🤍";

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🎉 ¡Pedido confirmado, estamos preparando tu orden!",
      body,
      sound: "default",
    },
    trigger: { seconds: 2 },
  });
}

export async function scheduleRecommendationsNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤤 Recomendados para ti",
      body: "Mira los nuevos rollos que tenemos hoy.",
      sound: "default",
    },
    trigger: { seconds: 30 },
  });
}
