import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import WorkoutList from './components/workoutList';
import NewWorkoutButton from './components/newWorkoutButton';
import { backgroundLight } from './colors';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NewWorkoutButton />
        <WorkoutList />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
});
