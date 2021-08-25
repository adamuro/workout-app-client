import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllWorkouts } from "../api/workout";
import { selectSelectedExercise, selectSelectedWorkout, selectWorkouts, setWorkouts } from "../slices/workoutSlice";
import WorkoutItem from "./workoutItem";

const WorkoutList = () => {
  const dispatch = useDispatch();
  const workouts = useSelector(selectWorkouts);
  const selected = useSelector(selectSelectedWorkout);
  const exerciseSelected = useSelector(selectSelectedExercise) !== null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchGetAllWorkouts()
      .then(({ docs, error }) => {
        dispatch(setWorkouts(docs ?? []));
        setError(error ?? "");
        setLoading(false);
      });
  }, []);

  const keyExtractor = (workout) => workout._id;
  const renderItem = ({ item: workout, index }) => (
    <WorkoutItem
      index={index}
      _id={workout._id}
      createdAt={workout.createdAt}
      exercises={workout.exercises}
      selected={workout._id === selected}
      exerciseSelected={exerciseSelected}
    />
  );

  /* Handle loading and error */
  return (
    <View style={styles.container}>
      <FlatList 
        data={workouts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WorkoutList;