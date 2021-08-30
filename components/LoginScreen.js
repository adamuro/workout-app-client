import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../api/user';
import { setUser } from '../slices/userSlice';
import { backgroundDark, backgroundLight, red, transparent } from '../styles/colors';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const errorText = useMemo(() => <Text style={styles.errorText}>{error}</Text>, [error]);

  const handleTokenProvided = (token) => {
    const user = jwtDecode(token);
    dispatch(setUser(user));
    navigation.navigate("Workouts");
  }

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => token ? handleTokenProvided(token) : null)
      .catch((error) => setError(error.message));
  }, []);

  const handleLogin = () => {
    fetchLogin({ username, password })
      .then(({ token, error }) => {
        if (!token) return setError(error ?? "");

        AsyncStorage.setItem("token", token);
        handleTokenProvided(token);
      });
  };

  return (
    <View style={styles.container}>
      {error ? errorText : null}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        // onSubmitEditing={handleAddExercise}
        // onFocus={handleNameInputFocus}
        // ref={nameInput}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        // onSubmitEditing={handleAddExercise}
        // onFocus={handleNameInputFocus}
        // ref={nameInput}
        placeholder="Password"
      />
      <TouchableHighlight style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> LOGIN </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: backgroundLight,
  },
  errorText: {
    fontSize: 16,
    color: red,
    textAlign: "center",
    padding: 10,
  },
  input: {
    fontSize: 16,
    color: "white",
    padding: 10,
    textAlign: "center",
    backgroundColor: backgroundDark,
    borderRadius: 30,
    margin: 10,
  },
  button: {
    backgroundColor: transparent,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 30,
    margin: 10,
    marginHorizontal: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export default LoginScreen;