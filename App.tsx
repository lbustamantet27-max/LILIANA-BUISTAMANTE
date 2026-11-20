//Paso 2
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

//Paso 5 y Paso 7
import {
  ensureNotificationPermission,
  showLocalNotification,
} from "./src/notifications/localNotifications";

//Paso 2
export default function App() {
  //Paso 5
  const handleNotify = async () => {
    try {
      const allowed = await ensureNotificationPermission();
      if (!allowed) {
        Alert.alert(
          "Permiso denegado",
          "Activa los avisos en ajustes del teléfono.",
        );
        return;
      }
      //Alert.alert("Permiso concedido", "Ya podemos programar el aviso.");
      //Paso 7
      await showLocalNotification();
    } catch (error) {
      Alert.alert("Error", "No se pudo preparar la notificación.");
    }
  };

  //Paso 2
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratorio de avisos</Text>
      <Text style={styles.description}>
        Pulsa el botón para probar una notificación.
      </Text>
      <Pressable
        style={styles.button}
        // onPress={() => Alert.alert("Botón listo", "Aún no hay notificación.")}
        //Paso 5
        onPress={handleNotify}
      >
        <Text style={styles.buttonText}>Enviar notificación</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#087f8c",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
