import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAddExercise } from "../api/workout";
import { backgroundLight, transparent } from "../styles/colors";
import { updateWorkout } from "../slices/workoutSlice";

const NewExerciseForm = ({ workout_id }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleAddExercise = () => {
    fetchAddExercise(workout_id, { name })
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        setName("");
        dispatch(updateWorkout(workout));
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Exercise name"
        onChangeText={setName}
        value={name}
        onSubmitEditing={handleAddExercise}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={handleAddExercise}
      >
        <Text style={styles.text}> ADD </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: backgroundLight,
    borderTopColor: "black",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: transparent,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginLeft: 10,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default NewExerciseForm;
