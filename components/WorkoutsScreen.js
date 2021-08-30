import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices/userSlice';
import { backgroundLight } from '../styles/colors';
import NewWorkoutButton from './NewWorkoutButton';
import WorkoutList from './WorkoutList';
import WorkoutsOptions from './WorkoutsOptions';

const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const handleTokenMissing = () => {
    dispatch(setUser(null));
    navigation.navigate("Login");
  };

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => !token ? handleTokenMissing() : null)
      .catch((error) => handleTokenMissing());
  }, [user]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => user && e.preventDefault())
    return () => navigation.removeListener("beforeRemove");
  }, [navigation, user]);

  return (
    <View style={styles.container}>
      <WorkoutsOptions/>
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