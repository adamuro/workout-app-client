import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteWorkout } from "../api/workout";
import { deleteWorkout, selectSelected, setSelected } from "../slices/workoutSlice";
import { backgroundLight, danger, transparent } from "../styles/colors";
import ExerciseList from "./exerciseList";
import NewExerciseForm from "./newExerciseForm";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const WorkoutItem = ({ index, _id, createdAt, exercises }) => {
  const dispatch = useDispatch();
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  setInterval(() => {
    setCurrentDay(new Date().getDate());
  }, 60000);

  const exercisesList = useMemo(() => <ExerciseList exercises={exercises}/>);
  const selected = useSelector(selectSelected) === _id;
  const backgroundColor = useMemo(() => selected ? transparent : backgroundLight, [index, selected]);
  const dateText = useMemo(() => {
    const workoutDate = new Date(createdAt);
    const workoutDay = ("0" + workoutDate.getDate()).slice(-2);
    const workoutMonth = ("0" + (workoutDate.getMonth() + 1)).slice(-2);
    const workoutYear = workoutDate.getFullYear();

    const currentDate = new Date();
    const currentUTC = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const workoutUTC = Date.UTC(workoutDate.getFullYear(), workoutDate.getMonth(), workoutDate.getDate());
    const dateDifferenceInDays = Math.floor((currentUTC - workoutUTC) / MS_PER_DAY);
    const dayWord = dateDifferenceInDays === 1 ? "day" : "days";
    const daysAgoSentence = dateDifferenceInDays === 0 ? "today" : `${dateDifferenceInDays} ${dayWord} ago`;

    return `${workoutDay}-${workoutMonth}-${workoutYear}, so ${daysAgoSentence}`;
  }, [currentDay]);


  const handlePress = () => dispatch(setSelected(_id));
  const handleDelete = () => {
    fetchDeleteWorkout(_id)
      .then(({ deletedCount, error }) => {
        if (error) return; // Might need some handling
        if (deletedCount < 1) return;

        dispatch(deleteWorkout(_id));
      });
  };


  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.item, { backgroundColor }]}
          onPress={handlePress}
        >
          <Text style={styles.text}>
            {dateText} 
          </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}> DELETE </Text>
          </TouchableHighlight>
        </TouchableOpacity>
      </View>
      {selected && exercises.length > 0 && exercisesList}
      {selected && 
        <NewExerciseForm 
          workout_id={_id}
        />
      }
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
  },
  button: {
    backgroundColor: danger,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  }
});

export default WorkoutItem;
