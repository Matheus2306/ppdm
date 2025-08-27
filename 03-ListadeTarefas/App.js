import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

const THEME_KEY = "theme";

const palettes = {
  light: {
    background: "#e0f7fa",
    text: "#333",
    card: "#fff",
    primary: "#009688",
    topBarBg: "#fff",
    topBarTitle: "#00796b",
    border: "rgba(0,0,0,0.1)",
    taskBg: "#fff",
    placeholder: "#666",
    empty: "#9e9e9e",
  },
  dark: {
    background: "#121212",
    text: "#eee",
    card: "#1e1e1e",
    primary: "#26a69a",
    topBarBg: "#1e1e1e",
    topBarTitle: "#80cbc4",
    border: "rgba(255,255,255,0.15)",
    taskBg: "#1f1f1f",
    placeholder: "#888",
    empty: "#555",
  },
};

export default function App() {
  const [task, setTask] = useState([]);
  const [newtask, setNewtask] = useState("");
  const [theme, setTheme] = useState("light");

  // carrega tasks
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) setTask(JSON.parse(savedTasks));
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    };
    loadInitial();
  }, []);

  // salva tasks
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(task)).catch((e) =>
      console.error("Erro ao salvar tarefas", e)
    );
  }, [task]);

  // salva tema
  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, theme).catch((e) =>
      console.error("Erro ao salvar tema", e)
    );
  }, [theme]);

  const palette = palettes[theme];
  const styles = useMemo(() => createStyles(palette), [palette]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const addtask = () => {
    if (newtask.trim().length > 0) {
      setTask((prev) => [
        ...prev,
        { id: Date.now().toString(), text: newtask.trim(), completed: false },
      ]);
      setNewtask("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Atenção", "Por favor informe uma tarefa");
    }
  };

  const toggleCompleteted = (id) => {
    setTask((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert("Confirmar exclusão", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setTask((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const renderList = ({ item }) => (
    <View style={styles.taskItem} key={item.id}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleCompleteted(item.id)}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedTaskItem,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.taskText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTittle}>Minhas Tarefas</Text>
        <TouchableOpacity onPress={toggleTheme} accessibilityLabel="Alternar tema">
          <Text style={styles.topBarTittle}>
            {theme === "light" ? "🌙" : "☀️"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor={palette.placeholder}
          value={newtask}
          onChangeText={setNewtask}
          onSubmitEditing={addtask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addtask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatList}
        data={task}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Nenhuma tarefa adicionada</Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style={theme === "light" ? "dark" : "light"} />
    </View>
  );
}

function createStyles(p) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: p.background,
      
    },
    topBar: {
      backgroundColor: p.topBarBg,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: p.border,
    },
    topBarTittle: {
      color: p.topBarTitle,
      fontSize: 24,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: p.card,
      margin: 20,
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    input: {
      backgroundColor: p.background === "#121212" ? "#1e1e1e" : "#fcfcfc",
      color: p.text,
      borderColor: p.border,
      borderWidth: 1,
      borderRadius: 15,
      padding: 20,
      fontSize: 18,
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: p.primary,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    flatList: {
      flex: 1,
    },
    flatListContent: {
      paddingBottom: 10,
    },
    taskItem: {
      backgroundColor: p.taskBg,
      borderColor: p.border,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 15,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
    },
    taskTextContainer: {
      flex: 1,
      marginRight: 10,
    },
    taskText: {
      color: p.text,
      fontSize: 18,
      flexWrap: "wrap",
    },
    completedTaskItem: {
      textDecorationLine: "line-through",
      opacity: 0.6,
    },
    emptyListText: {
      color: p.empty,
      textAlign: "center",
      marginTop: 50,
      fontSize: 16,
    },
  });
}
