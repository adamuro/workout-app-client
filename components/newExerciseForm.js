import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAddExercise } from "../api/workout";
import { updateWorkout } from "../slices/workoutSlice";
import { backgroundLight, transparent } from "../styles/colors";

const NewExerciseForm = ({ workout_id }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const nameInput = useRef(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);
    return () => Keyboard.removeAllListeners("keyboardDidHide");
  }, []);

  const handleNameInputFocus = () => setName("");
  const handleKeyboardDidHide = () => nameInput.current.blur();
  const handleAddExercise = () => {
    if (!name) return nameInput.current.focus();

    fetchAddExercise(workout_id, { name })
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        setName("");
        dispatch(updateWorkout(workout));
      });
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleAddExercise}
          onFocus={handleNameInputFocus}
          ref={nameInput}
          placeholder="New exercise"
        />
      </View>
      <TouchableHighlight style={styles.button} onPress={handleAddExercise}>
        <Text style={styles.buttonText}> ADD </Text>
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
  inputContainer: {
    flex: 2,
  },
  input: {
    flex: 2,
    fontSize: 16,
    color: "white",
    paddingRight: 10,
    paddingLeft: 5,
  },
  button: {
    flex: 1,
    backgroundColor: transparent,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    marginRight: 10,
  },
});

export default NewExerciseForm;
