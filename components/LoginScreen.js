import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchLogin, fetchRegister } from '../api/user';
import { setUser } from '../slices/userSlice';
import { backgroundDark, backgroundLight, grey, red, transparent } from '../styles/colors';
import LoginSwitch from "./LoginSwitch";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [option, setOption] = useState("LOGIN");
  const [error, setError] = useState("");
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const errorText = useMemo(() => <Text style={styles.errorText}>{error}</Text>, [error]);

  const handleUsernameInputFocus = () => setUsername("");
  const handlePasswordInputFocus = () => setPassword("");

  const handleTokenProvided = (token) => {
    navigation.navigate("Workouts");
    const user = jwtDecode(token);
    dispatch(setUser(user));
  }

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => token ? handleTokenProvided(token) : null)
      .catch((error) => setError(error.message));
  }, []);

  const handleSubmit = () => {
    setError("");
    if (!username) return usernameInput.current.focus();
    if (!password) return passwordInput.current.focus();
    setUsername("");
    setPassword("");

    option === "LOGIN" ? handleLogin() : handleRegister();
  }
  const handleLogin = () => {
    fetchLogin({ username, password })
      .then(({ token, error }) => {
        if (!token) return setError(error ?? "");

        AsyncStorage.setItem("token", token);
        handleTokenProvided(token);
      });
  };

  const handleRegister = () => {
    fetchRegister({ username, password })
      .then(({ token, error }) => {
        if (!token) return setError(error ?? "");

        AsyncStorage.setItem("token", token);
        handleTokenProvided(token);
      });
  };

  return (
    <View style={styles.container}>
      {error ? errorText : null}
      <LoginSwitch setOption={setOption}/>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        maxLength={32}
        onSubmitEditing={handleSubmit}
        onFocus={handleUsernameInputFocus}
        ref={usernameInput}
        placeholderTextColor={grey}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        maxLength={32}
        secureTextEntry={true}
        onSubmitEditing={handleSubmit}
        onFocus={handlePasswordInputFocus}
        ref={passwordInput}
        placeholderTextColor={grey}
        placeholder="Password"
      />
      <TouchableHighlight style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}> {option} </Text>
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