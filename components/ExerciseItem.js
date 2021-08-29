import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchDeleteExercise } from "../api/workout";
import { setSelectedExercise, updateWorkout } from "../slices/workoutSlice";
import { backgroundDark, backgroundLight, danger } from "../styles/colors";
import NewSeriesForm from "./NewSeriesForm";
import SeriesList from "./SeriesList";

const ExerciseItem = ({ _id, name, series, selected }) => {
  const dispatch = useDispatch();

  const seriesList = useMemo(() => <SeriesList series={series}/>, [series]);
  const newSeriesForm = useMemo(() => <NewSeriesForm exercise_id={_id}/>, []);
  const backgroundColor = useMemo(() => selected ? backgroundDark : backgroundLight, [selected]);

  const handlePress = () => dispatch(setSelectedExercise(_id));
  const handleDelete = () => {
    fetchDeleteExercise(_id)
      .then(({ workout, error }) => {
        if (error) return; // Might need some handling

        if (selected)
          dispatch(setSelectedExercise(_id)) 
        dispatch(updateWorkout(workout));
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={handlePress}>
        <View style={styles.textContainer}>
          <Text style={styles.text}> {name} </Text>
        </View>
        <TouchableHighlight style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}> DELETE </Text>
        </TouchableHighlight>
      </TouchableOpacity>
      {selected && series.length > 0 && seriesList}
      {selected && newSeriesForm}
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
  button: {
    flex: 1,
    backgroundColor: danger,
    paddingVertical: 5,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  textContainer: {
    flex: 2,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
});


export default ExerciseItem;
