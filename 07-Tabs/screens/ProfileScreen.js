import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function ProfileSccreen() {
  const [userId] = useState("111111");

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
