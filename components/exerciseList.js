import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import ExerciseItem from './exerciseItem';

const ExerciseList = ({ exercises }) => {
  const keyExtractor = (exercise) => exercise._id;
  const renderItem = ({ item: exercise }) => {
    return (
    <ExerciseItem
      _id={exercise._id}
      name={exercise.name}
    />
  )};

  /* Handle loading */
  return (
    <View style={styles.container}>
      {/* ErrorText */}
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