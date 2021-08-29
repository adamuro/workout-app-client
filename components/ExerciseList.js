import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { selectSelectedExercise } from "../slices/workoutSlice";
import ExerciseItem from "./ExerciseItem";

const ExerciseList = ({ exercises }) => {
  const selected = useSelector(selectSelectedExercise);

  const keyExtractor = (exercise) => exercise._id;
  const renderItem = ({ item: exercise }) => (
    <ExerciseItem
      _id={exercise._id}
      name={exercise.name}
      series={exercise.series}
      selected={exercise._id === selected}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExerciseList;