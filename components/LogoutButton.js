import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../api/user";
import { setUser } from "../slices/userSlice";
import { backgroundLight, red } from "../styles/colors";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {
    fetchLogout()
      .then(({ message, error }) => {
        if (error) return; // Might need some handling
        if (message !== "Success") return;
        AsyncStorage.removeItem("token");
      })
      .then(() => dispatch(setUser(null)))
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.5}
        onPress={handlePress}
      >
        <Text style={styles.text}> LOGOUT </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  button: {
    backgroundColor: red,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LogoutButton;
