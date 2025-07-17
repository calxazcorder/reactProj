import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Numbers: React.FC = () => {
  const [count, setCount] = useState(5); // initial value

  const handleIncrement = () => {
    if (count < 10) setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecrement} style={styles.button}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>

      <View style={styles.numberBox}>
        <Text style={styles.text}>{count}</Text>
      </View>

      <TouchableOpacity onPress={handleIncrement} style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: "black",
    // borderWidth: 2,
    flexDirection: "row", // horizontal layout
    alignItems: "center",
    justifyContent: "center",
    flex: 0.65,
    maxWidth: 120,
    alignSelf: "center",
    padding: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
  numberBox: {
    marginHorizontal: 10,
    minWidth: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Numbers;
