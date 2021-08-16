import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExerciseItem from "./exerciseItem";

const ExerciseList = ({ exercises }) => {
  const keyExtractor = (exercise) => exercise._id;
  const renderItem = ({ item: exercise }) => {
    return (
    <ExerciseItem
      _id={exercise._id}
      name={exercise.name}
      series={exercise.series}
    />
  )};

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