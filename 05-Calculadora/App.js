import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const lightTheme = {
  background: "#f0f0f0",
  Input: "#ccc",
  btn: "#949494",
  textInput: "#525252",
  past: "#969696"
};

const darkTheme = {
  background: "#121212",
  Input: "#1E1E1E",
  btn: "#A8A8A8",
  textInput: "#969696",
  past: "#525252"
};

const nubers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const operations = ["+", "-", "*", "/"];

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  // Variável de estado do input
  const [inputValue, setInputValue] = useState("0");
  //histórico
  const [pastOperation, setPastOperation] = useState("")

  //useEffect para impedir que o inputValue comece com um operador e não permita operadores consecutivos
  useEffect(() => {
    // Impede que o inputValue comece com um operador
    if (operations.includes(inputValue[0])) {
      setInputValue("0");
      return;
    }

    // Impede operadores consecutivos
    for (let i = 0; i < inputValue.length - 1; i++) {
      if (
        operations.includes(inputValue[i]) &&
        operations.includes(inputValue[i + 1])
      ) {
        setInputValue((prev) => prev.slice(0, -1));
        return;
      }
    }
  }, [inputValue]);

  //função de clear
  const handleClear = () =>{
    setInputValue("0")
    setPastOperation("")
  }

  // Função para calcular o resultado
  const calculateResult = () => {
    try {
      // Avalia a expressão no inputValue
      const result = eval(inputValue);
      setInputValue(result.toString());
      setPastOperation(inputValue)
    } catch (error) {
      setInputValue("Erro");
    }
  };

  // Função para lidar com o clique nos botões 
  const handleButtonPress = (value) => {
    setInputValue((prev) =>
      //se o botao de . for pressionado então mantem o inputValue 
      value === "." && prev.includes("0") ? prev+ value :
      //se o inputValue for 0, substitui pelo valor do botão, caso contrário, concatena o valor do botão
      prev === "0" ? value : prev + value);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.containerInput}>
        <Text style={styles.past}>{pastOperation}</Text>
        <Text style={styles.textInput}>{inputValue}</Text>
      </View>
      <View style={styles.containerButtons}>
        {operations.map((op) => (
          <TouchableOpacity
            key={op}
            style={[styles.btn, { backgroundColor: "#99F2BB" }]}
            onPress={() => handleButtonPress(op)}
          >
            <Text style={styles.textButton}>{op}</Text>
          </TouchableOpacity>
        ))}
        {nubers.map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.btn}
            onPress={() => handleButtonPress(num.toString())}
          >
            <Text style={styles.textButton}>{num}</Text>
          </TouchableOpacity>
        ))}
      <View style={styles.result}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#6BCBFF" }]}
          onPress={calculateResult}
        >
          <Text style={styles.textButton}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#FF6B6B" }]}
          onPress={handleClear}
        >
          <Text style={styles.textButton}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#FF6B6B" }]}
          onPress={() =>
            setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
          }
        >
          <Text style={styles.textButton}>CE</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 60,
      gap: 20,
    },
    containerInput: {
      width: "90%",
      height: 120,
      backgroundColor: theme.Input,
      borderRadius: 10,
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: 20,
    },
    past:{
      color: theme.past,
    },
    textInput: {
      fontSize: 40,
      color: theme.textInput,
    },
    containerButtons: {
      backgroundColor:theme.Input,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      padding: 12,
      borderRadius: 10,
      width: "90%",
    },
    btn: {
      backgroundColor: theme.btn,
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
    },
    textButton: {
      fontSize: 25,
    },
    result: {
      backgroundColor:theme.Input,
      flexDirection: "row",
      gap: 10,
    },
  });
