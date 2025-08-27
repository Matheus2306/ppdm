import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTittle}>Minhas Tarefas</Text>
        <TouchableOpacity>
          <Text>☀️</Text>
        </TouchableOpacity>
      </View>

      {/* local onde o usuario insere as tarefas */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {/* lista de tarefas */}
      <FlatList
        style={styles.flatList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma tarefa adicionando ainda
          </Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",

  },
  topBar: {
    backgroundColor:"#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.1)",
  },
  topBarTittle: {
    color:"#00796b",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor:"#fff",
    color:"#000",
    shadowColor: "#000",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    backgroundColor:"#fcfcfc",
    color:"#333",
    borderColor:"#b0bec5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor:"#009688",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10, //espaçamento no final da lista
  },
  taskItem: {
    backgroundColor: "#fff",
    color: "#333",
    borderColor: "rgba(0,0,0, 0.1)",
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
    elevation: 10,
    borderWidth: 1,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    color:"#333",
    fontSize: 18,
    flexWrap: "wrap",
  },
  completedTaskItem: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyListText: {
    color:"#9e9e9e",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
