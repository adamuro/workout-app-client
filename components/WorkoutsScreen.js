import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { backgroundLight } from '../styles/colors';
import NewWorkoutButton from './NewWorkoutButton';
import WorkoutList from './WorkoutList';

const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) return;

        dispatch(setUser(null));
        navigation.navigate("Login");
      })
      .catch((error) => dispatch(setUser(null)));
  }, []);

  return (
    <View style={styles.container}>
      <NewWorkoutButton/>
      <WorkoutList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
});

export default WorkoutsScreen;