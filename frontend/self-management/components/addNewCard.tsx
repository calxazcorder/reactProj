import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button } from "react-native";
import Checkbox from 'expo-checkbox';
import ActivitiesService from "../services/activitiesService";
import { activitySave } from "../types";

const NewCard: React.FC = () => {
  const [plused, setPlused] = useState<boolean>(false);
  const [criteriaList, setCriteriaList] = useState<string[]>(['']);
  const [criteriaHashmap, setCriteriaHashmap] = useState<Record<string, boolean>>({});
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handlePress = () => {
    setPlused(true); // Set plused to true when the plus sign is clicked
  };

  const handleCheckboxChange = (index: number, value: boolean) => {
    const criteriaText = criteriaList[index];
    
    // Only update if there's text in the input
    if (criteriaText.trim() !== "") {
      setCriteriaHashmap(prevHashmap => ({
        ...prevHashmap,
        [criteriaText]: value  // Set the checkbox value (true/false)
      }));
    }
    
    console.log("Checkbox changed:", criteriaText, value);
  };

  const handleInputChange = (text: string, index: number) => {
    const oldText = criteriaList[index]; // Store the old text
    const updatedList = [...criteriaList];
    updatedList[index] = text;
    setCriteriaList(updatedList);
  
    setCriteriaHashmap(prevHashmap => {
      const newHashmap = { ...prevHashmap };
      
      // Remove the old entry if it existed
      if (oldText.trim() !== "") {
        const oldValue = newHashmap[oldText] || false; // Preserve the old checkbox state
        delete newHashmap[oldText];
        
        // Add new entry with the preserved checkbox state if new text is not empty
        if (text.trim() !== "") {
          newHashmap[text] = oldValue;
        }
      } else {
        // If it's a completely new entry, default to false
        if (text.trim() !== "") {
          newHashmap[text] = false;
        }
      }
      
      return newHashmap;
    });
  
    // Add new empty input if the last one is filled
    if (index === criteriaList.length - 1 && text.trim() !== "") {
      setCriteriaList([...criteriaList, ""]); // Add a new empty input
    }
  };

  const handleSubmit = async () => {
    // Handle the submission of criteria
    console.log("Submitted Criteria:", criteriaHashmap);
    if (activityTitle.trim() === '') { 
      setErrorMessage(true);
    }
    const whatever: activitySave = {
      title: activityTitle,
      criterias: criteriaHashmap
    };
    console.log("submitted thingy", whatever)
    await ActivitiesService.addNew(whatever);
  };

  return (
    <>
      {!plused && (
        <TouchableOpacity onPress={handlePress} style={styles.roundWithPlusInside}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      )}
      {plused && (
        <>
          <View style={styles.form}>
            <TextInput 
              value={activityTitle} 
              onChangeText={(text) => setActivityTitle(text)} // Correctly call setActivityTitle
              placeholder="What do you want to keep track of?" 
              style={styles.input} 
            />

            {criteriaList.map((criteria, index) => (
              <View key={index} style={styles.criteriaRow}>
                <TextInput
                  placeholder={`Criteria ${index + 1}`}
                  style={styles.criteriaInput}
                  onChangeText={(text) => handleInputChange(text, index)}
                  value={criteria}
                />
                <Checkbox
                  style={styles.checkbox}
                  value={criteriaHashmap[criteria] || false}
                  onValueChange={(value) => handleCheckboxChange(index, value)}
                  color={criteriaHashmap[criteria] ? '#4630EB' : undefined}
                />
              </View>
            ))}

            <Text>New Criteria Count: {criteriaList.length}</Text>
            <Text>Debug - Hashmap: {JSON.stringify(criteriaHashmap)}</Text>

            <Button title="Submit" onPress={handleSubmit} />
          </View>
          {errorMessage && (
            <View>
              <Text>title or criterias missing</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  roundWithPlusInside: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  criteriaInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});

export default NewCard;