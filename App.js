import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import WorkoutList from "./components/workoutList";
import NewWorkoutButton from "./components/newWorkoutButton";
import { backgroundLight } from "./styles/colors";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={backgroundLight}
        animated={true}
        translucent={false}
      />
      <Provider store={store}>
        <NewWorkoutButton />
        <WorkoutList />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
});
