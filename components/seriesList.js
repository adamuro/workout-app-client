import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SeriesItem from "./seriesItem";

const SeriesList = ({ series }) => {
  const keyExtractor = (series) => series._id;
  const renderItem = ({ item: series }) => {
    return (
    <SeriesItem
      _id={series._id}
      name={series.name}
      weight={series.weight}
      reps={series.reps}
    />
  )};

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
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

export default SeriesList;
