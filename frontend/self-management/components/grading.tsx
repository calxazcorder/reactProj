import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Numbers from "./numbers";
import YesNo from "./doneOrNot";

interface Props {
  yesNo: boolean; 
  name: string;
}

const Grading: React.FC<Props> = ({ yesNo, name }: Props) => {
    // Function to fetch grading information for a specific parent

  return (
    // This component is created for each grading instance
    <View style={styles.gradingDiv}>
        <Text style={styles.noseInYour}>{name}</Text>
        {!yesNo && <Numbers />}
        {yesNo && <YesNo />}
    </View>
  );
};

const styles = StyleSheet.create({
  gradingDiv: {
    padding: 10,
    borderColor: 'black', // Changed from borderBlockColor to borderColor
    borderWidth: 2,
    marginTop: 20,
    minHeight: '10%',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row' // Consider changing to 'column' if stacking components
  },
  noseInYour: { 
    alignSelf: 'center'
  },
});

export default Grading;
