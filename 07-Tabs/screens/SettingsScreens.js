import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function settingsScreens() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>⚙️ ajuste suas configurações aqui</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container:{ flex: 1, justifyContent:"center", alignItems:"center"},
    text:{fontWeight:"bold", fontSize:24,}
});
