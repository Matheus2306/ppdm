import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import "react-native-get-random-values"
//importa função uui para gerar IDs únicos
import {v4 as uuidv4} from "uuid"

export default function ProfileSccreen() {
  const [userId] = useState(uuidv4());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>👤 Tela de Perfil</Text>
      <Text style={styles.text}>Seu Id único: {userId}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
