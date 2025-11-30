import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  id: number;
  done: boolean;
};

// individual todo task rows inside of the scrollview
const TodoRow = ({ text, id, done }: Props) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={[styles.text, done ? styles.strike : null]}>{text}</Text>
    </View>
  );
};

export default TodoRow;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 12,
    marginHorizontal: 12,
    backgroundColor: "lemonchiffon",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#000",
    borderWidth: 2,
    justifyContent: "center",
    marginBottom: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 900,
  },
  strike: {
    textDecorationLine: "line-through",
    color: "#888",
    fontWeight: 200,
  },
});
