import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchDeleteExercise } from "../api/workout";
import { backgroundLight, danger } from "../styles/colors";
import { updateWorkout } from "../slices/workoutSlice";

const ExerciseItem = ({ _id, name }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    fetchDeleteExercise(_id)
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        dispatch(updateWorkout(workout));
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
      >
        <Text style={styles.text}>
          {name}
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}> DELETE </Text>
        </TouchableHighlight>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: "black",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: backgroundLight,
  },
  button: {
    backgroundColor: danger,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});


export default ExerciseItem;
