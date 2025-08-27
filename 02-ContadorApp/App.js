import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [contador, setcontador] = useState(0);

  const handleIncrement = () => {
    setcontador(contador + 1);
  };

  const handledecrement = () => {
    contador > 0 && setcontador(contador - 1);
  };

  const handleReset = () => {
    setcontador(0);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>
      <View style={styles.containerbutton}>
        <Text style={styles.counterText}>{contador}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <Text style={styles.buttonText}>+ aumentar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handledecrement}>
            <Text style={styles.buttonText}>- Diminuir</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.resetbutton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Zerar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D04A9",
  },
  title: {
    fontSize: 32,
    marginTop: 40,
    marginStart: 21,
    fontWeight: "bold",
    marginBottom: 30,
  },
  counterText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#1649CB",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttons: {
    flex: 1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:12
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerbutton: {
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    gap: 6,
  },
  resetbutton: {
    backgroundColor: "#dc3545",
  },
});
