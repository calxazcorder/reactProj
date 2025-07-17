import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const YesNo: React.FC = () => {
  const [isYes, setIsYes] = useState<boolean>(false); // initial value

  const toggleYesNo = () => {
    setIsYes((prev) => !prev); // toggle between true and false
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleYesNo} style={styles.button}>
        <Text style={styles.text}>{isYes ? "Yes" : "No"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default YesNo;
