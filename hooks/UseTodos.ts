import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";

type TodoState = {
  id: number;
  task: string;
  done: boolean;
};

type TodoAction =
  | { type: "TOGGLE"; payload: number }
  | { type: "CREATE"; payload: string }
  | { type: "LOAD"; payload: TodoState[] };

const todoReducer = (state: TodoState[], action: TodoAction): TodoState[] => {
  switch (action.type) {
    case "LOAD": {
      return action.payload;
    }

    case "TOGGLE": {
      const id = action.payload;
      return state.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      );
    }

    case "CREATE": {
      const id = Math.floor(Math.random() * 10000) + 1;
      const newTodo: TodoState = { id: id, task: action.payload, done: false };
      return [...state, newTodo];
    }

    default:
      return state;
  }
};

const STORAGE_KEY = "TODOS_ITEMS_STORAGE";

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsedJson: TodoState[] = JSON.parse(json);
          dispatch({ type: "LOAD", payload: parsedJson });
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [state]);

  const handleCreateTodo = (task: string) => {
    dispatch({ type: "CREATE", payload: task });
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  return {
    state,
    handleToggleTodo,
    handleCreateTodo,
  };
};
