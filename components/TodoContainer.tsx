import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ContainerProps = {
  submitTodo: () => void;
  setTodo: Dispatch<SetStateAction<string>>;
  todo: string;
};

const TodoContainer = ({ submitTodo, setTodo, todo }: ContainerProps) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Todo task name"
          onChangeText={setTodo}
          value={todo}
          style={styles.inputField}
        />
      </View>
      <View>
        <Pressable onPress={submitTodo}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TodoContainer;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    height: 48, // cringe but ok "auto" was 10px tall
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputField: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 12,
  },
});
