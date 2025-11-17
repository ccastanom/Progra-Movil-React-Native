import * as Notifications from "expo-notifications";

export async function sendWelcomeNotification(name = "Que Rollo") {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bienvenido a Que Rollo ❤️",
      body: `Inicio de sesión exitoso${name ? `, ${name}` : ""}`,
    },
    trigger: { seconds: 10},
  });
}

export async function sendOrderConfirmedNotification(total) {
  let bodyText = "Gracias por tu compra en Que Rollo 🤍";

  if (typeof total === "number") {
    bodyText = `Gracias por tu compra en Que Rollo. Total: $${total.toLocaleString()}`;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🎉 ¡Pedido confirmado!",
      body: bodyText,
    },
    trigger: { seconds: 2}, 
  });
}


export async function scheduleRecommendationsNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤤 Recomendados para ti",
      body: "Mira los nuevos rollos que tenemos hoy para ti.",
    },
    trigger: { seconds: 30},
  });
}

