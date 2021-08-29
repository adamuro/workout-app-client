import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchAddWorkout } from "../api/workout";
import { addWorkout, setSelectedWorkout } from "../slices/workoutSlice";
import { backgroundLight, transparent } from "../styles/colors";

const NewWorkoutButton = () => {
  const dispatch = useDispatch();
  const handleAddWorkout = () => {
    fetchAddWorkout()
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        dispatch(addWorkout(workout));
        dispatch(setSelectedWorkout(workout._id));
      });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleAddWorkout}
      >
        <Text style={styles.text}> NEW WORKOUT </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundLight,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: transparent,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NewWorkoutButton;