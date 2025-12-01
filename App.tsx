import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TodoContainer from "./components/TodoContainer";
import TodoRow from "./components/TodoRow";
import { useTodos } from "./hooks/UseTodos";

export default function App() {
  const { state, handleCreateTodo, handleToggleTodo } = useTodos();
  const [todoInput, setTodoInput] = useState<string>("");

  const submitTodo = () => {
    if (todoInput.trim()) {
      handleCreateTodo(todoInput);
      setTodoInput("");
    }
  };

  const toggleTask = (id: number) => {
    handleToggleTodo(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Todo List</Text>
      <TodoContainer
        submitTodo={submitTodo}
        todo={todoInput}
        setTodo={setTodoInput}
      />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContent}
      >
        {state.map((item) => (
          <Pressable onPress={() => toggleTask(item.id)} key={item.id}>
            <TodoRow text={item.task} id={item.id} done={item.done} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 48,
  },
  scrollview: {
    paddingTop: 16,
  },
  scrollviewContent: {
    paddingBottom: 64,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 16,
  },
});
