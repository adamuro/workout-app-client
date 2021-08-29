import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAddSeries } from "../api/workout";
import { updateWorkout } from "../slices/workoutSlice";
import { backgroundLight, transparent } from "../styles/colors";

const NewSeriesForm = ({ exercise_id }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("")
  const weightInput = useRef(null);
  const repsInput = useRef(null);

  const handleWeightInputFocus = () => setWeight("");
  const handleRepsInputFocus = () => setReps("");
  const handleAddSeries = () => {
    if (!weight) return weightInput.current.focus();
    if (!reps) return repsInput.current.focus();

    fetchAddSeries(exercise_id, { weight, reps })
      .then(({ workout, error }) => {
        if (error) return // Might need some handling

        setWeight("");
        setReps("");
        dispatch(updateWorkout(workout));
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputLeft}
          value={weight}
          onChangeText={setWeight}
          onSubmitEditing={handleAddSeries}
          onFocus={handleWeightInputFocus}
          maxLength={5}
          ref={weightInput}
          placeholder="Weight"
          keyboardType="numeric"
        />
        <Text style={styles.text}> × </Text>
        <TextInput
          style={styles.inputRight}
          value={reps}
          onChangeText={setReps}
          onSubmitEditing={handleAddSeries}
          onFocus={handleRepsInputFocus}
          maxLength={2}
          ref={repsInput}
          placeholder="Reps"
          keyboardType="numeric"
        />
      </View>
      <TouchableHighlight style={styles.button} onPress={handleAddSeries}>
        <Text style={styles.buttonText}> ADD </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: backgroundLight,
    borderTopColor: "black",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLeft: {
    flex: 1,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  inputRight: {
    flex: 1,
    fontSize: 16,
    color: "white",
    textAlign: "center",
    paddingRight: 10,
  },
  text: {
    color: transparent,
    fontWeight: "400",
    fontSize: 16,
    paddingHorizontal: 10,
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
  },
});

export default NewSeriesForm;

