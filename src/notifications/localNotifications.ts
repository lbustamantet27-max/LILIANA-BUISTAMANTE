// Paso 3
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const CHANNEL_ID = "laboratorio";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//Paso 4
export async function ensureNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "android") {
    try {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: "Avisos de laboratorio",
        importance: Notifications.AndroidImportance.HIGH,
      });
    } catch {}
  }
  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    permission = await Notifications.requestPermissionsAsync();
  }
  return (
    permission.granted ||
    permission.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

//Paso 6
export async function showLocalNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hola mundo",
      body: `Prueba programada el ${new Date().toLocaleString("es-PE")}.`,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
      channelId: CHANNEL_ID,
    },
  });
}
