import React from 'react'
import { StyleSheet, View } from 'react-native';
import { backgroundLight, transparent } from '../styles/colors';
import LogoutButton from './LogoutButton';
import NewWorkoutButton from './NewWorkoutButton';

const WorkoutsOptions = () => {
  return (
    <View style={styles.container}>
      <NewWorkoutButton/>
      <LogoutButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: backgroundLight,
  },
});


export default WorkoutsOptions;