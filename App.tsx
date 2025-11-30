import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TodoContainer from "./components/TodoContainer";
import TodoRow from "./components/TodoRow";

interface TodoTask {
  id: number;
  task: string;
  done: boolean;
}

const STORAGE_KEY = "TODOS_ITEMS_STORAGE";

export default function App() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [todo, setTodo] = useState<string>("");

  const submitTodo = () => {
    if (todo.trim()) {
      setTasks((prev) => [
        ...prev,
        {
          id: Math.floor(Math.random() * 10000) + 1, // eh should be high enough
          task: todo,
          done: false,
        },
      ]);
      setTodo("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      // iterate through the tasks
      tasks.map((task) =>
        // if iterated task id matches to passed id, spread the task and replace done with opposite value, else return iteratee
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  // load from storage
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTasks(JSON.parse(json));
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    })(); // runs itself
  }, []);

  // set to storae
  useEffect(() => {
    (async () => {
      try {
        console.log("Setting item to storage");
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    })();
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Todo List</Text>
      <TodoContainer submitTodo={submitTodo} todo={todo} setTodo={setTodo} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContent}
      >
        {tasks.map((item: TodoTask) => (
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
