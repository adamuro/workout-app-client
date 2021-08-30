import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchDeleteSeries } from "../api/workout";
import { updateWorkout } from "../slices/workoutSlice";
import { backgroundLight, red } from "../styles/colors";

const SeriesItem = ({ _id, weight, reps }) => {
  const dispatch = useDispatch();
  const seriesText = useMemo(() => `${weight}kg × ${reps}`, [reps, weight]);

  const handleDelete = () => {
    fetchDeleteSeries(_id)
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        dispatch(updateWorkout(workout));
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.text}> {seriesText} </Text>
        </View>
        <TouchableHighlight style={styles.button} onPress={handleDelete}>
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
    backgroundColor: backgroundLight,
  },
  textContainer: {
    flex: 2,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    flex: 1,
    backgroundColor: red,
    paddingVertical: 5,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
});


export default SeriesItem;

